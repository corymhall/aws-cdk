import { Construct } from '@aws-cdk/core';
import { StatementConfig } from './statements/statement';
import { Statements } from './statements/statements';
import { XssMatchStatementProps } from './statements/xss-match-statement';
import { Visibility, VisibilityConfig, WebAcl } from './web-acl';

/**
 * Update
 */
// export enum RuleAction {
//   /**
//    * Update
//    */
//   ALLOW = 'Allow',
//
//   /**
//    * Update
//    */
//   BLOCK = 'Block',
//
//   /**
//    * Update
//    */
//   COUNT = 'Count'
// }

/**
 * Update
 */
// enum OverrideAction {
//
//   /**
//    * Update
//    */
//   COUNT = 'Count',
//
//   /**
//    * Update
//    */
//   NONE = 'None'
// }

/**
 * Update
 */
export interface RuleOptions {

  /**
   * Update
   * @default
   */
  readonly ruleName?: string;

  /**
   * Update
   * @default
   */
  readonly priority?: number;

  /**
   * Update
   * @default
   */
  readonly visibility?: Visibility;
}

/**
 * Update
 */
export interface RuleConfig extends RuleOptions {

  /**
   * Update
   * @default
   */
  readonly statement: StatementConfig;

  /**
   * Update
   * @default
   */
  readonly action?: object;

  /**
   * Update
   * @default
   */
  readonly overrideAction?: object;

  /**
   * Update
   */
  readonly visibilityConfig: VisibilityConfig;
}

/**
 * Update
 */
export abstract class Rule {
  /**
   * Update
   */
  public static blockXss(statementProps: XssMatchStatementProps, options?: RuleOptions): Rule {
    return new BlockXssAttack(statementProps, options);
  }

  /**
   * Update
   */
  public abstract bind(scope: Construct, webAcl: WebAcl, priority?: number): RuleConfig;
}

/**
 * Update
 */
class BlockXssAttack extends Rule {
  constructor(private readonly props: XssMatchStatementProps, private readonly options?: RuleOptions) {
    super();
  }

  /**
   * Update
   */
  public bind(scope: Construct, webAcl: WebAcl, priority?: number): RuleConfig {
    const finalPriority = this.options && this.options.priority ? this.options.priority : priority;
    const finalRuleName = this.options && this.options.ruleName ? this.options.ruleName : 'BlockXssAttack' + finalPriority;

    const statementConfig = Statements.xssMatchStatement(this.props).bind(scope, webAcl);
    const visibility = this.options && this.options.visibility !== undefined ?
      this.options.visibility :
      Visibility.enable('BlockXssAttackMetric' + finalPriority);

    return {
      action: {
        block: {}
      },
      ruleName: finalRuleName,
      statement: statementConfig,
      visibilityConfig: visibility.bind(scope, webAcl),
      priority: finalPriority,
      ...this.options
    };
  }
}
