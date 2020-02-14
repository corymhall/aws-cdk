import { Construct, Resource } from '@aws-cdk/core';
import { Rule } from './rule';
import { CfnWebACL } from './wafv2.generated';

/**
 * Update
 */
export abstract class Visibility {
  /**
   * Update
   */
  public static enable(metricName?: string, sample?: boolean): Visibility {
    return new EnableVisibility({
      cloudWatchMetricsEnabled: true,
      sampledRequestsEnabled: sample ?? true,
      metricName
    });
  }

  /**
   * Update
   */
  public static disable(sample?: boolean): Visibility {
    return new DisableVisibility({
      cloudWatchMetricsEnabled: false,
      sampledRequestsEnabled: sample ?? false
    });
  }

  /**
   * Update
   */
  public abstract bind(_scope: Construct, _webAcl: WebAcl): VisibilityConfig;
}

/**
 * Update
 */
class EnableVisibility extends Visibility {
  constructor(private readonly props: VisibilityConfig) {
    super();
  }

  /**
   * Update
   */
  public bind(_scope: Construct, _webAcl: WebAcl): VisibilityConfig {
    return {
      cloudWatchMetricsEnabled: this.props.cloudWatchMetricsEnabled,
      sampledRequestsEnabled: this.props.sampledRequestsEnabled,
      metricName: this.props.metricName
    };
  }
}

/**
 * Update
 */
class DisableVisibility extends Visibility {
  constructor(private readonly props: VisibilityConfig) {
    super();
  }

  /**
   * Update
   */
  public bind(_scope: Construct, _webAcl: WebAcl): VisibilityConfig {
    return {
      cloudWatchMetricsEnabled: this.props.cloudWatchMetricsEnabled,
      sampledRequestsEnabled: this.props.sampledRequestsEnabled,
    };
  }
}

/**
 * Update
 */
export interface VisibilityConfig {
  /**
   * Update
   *
   * @default
   */
  readonly cloudWatchMetricsEnabled?: boolean;

  /**
   * Update
   *
   * @default
   */
  readonly metricName?: string;

  /**
   * Update
   *
   * @default
   */
  readonly sampledRequestsEnabled?: boolean;
}

/**
 * Update
 */
export interface WebAclProps {
  /**
   * Update
   * @default ALLOW
   */
  readonly defaultAction?: DefaultAction;

  /**
   * Update
   * @default - none
   */
  readonly description?: string;

  /**
   * Update
   * @default - automatically generated
   */
  readonly webAclName?: string;

  /**
   * Update
   */
  readonly rules: Rule[];

  /**
   * Update
   */
  readonly visibility?: Visibility;
}

/**
 * Update
 * @resource AWS::WAFv2::WebACL
 */
export class WebAcl extends Resource {
  /**
   * Update
   * @attribute
   */
  public readonly webAclCapacity: number;

  /**
   * Update
   * @attribute
   */
  public readonly webAclArn: string;

  /**
   * Update
   * @attribute
   */
  public readonly webAclId: string;

  constructor(scope: Construct, id: string, props: WebAclProps) {
    super(scope, id, {
      physicalName: props.webAclName
    });

    const visibility = props.visibility ?? Visibility.enable();

    const defaultAction = generateDefaultAction(props.defaultAction);
    const visibilityConfig = visibility.bind(this, this);

    const webAcl = new CfnWebACL(this, 'WebAcl', {
      name: this.physicalName,
      defaultAction,
      rules: {
        rules: props.rules.map(rule => {
          const ruleConfig = rule.bind(this, this);
          return {
            action: ruleConfig.action,
            name: ruleConfig.ruleName,
            overrideAction: ruleConfig.overrideAction,
            // priority: ruleConfig.priority,
            statement: ruleConfig.statement.config,
            visibilityConfig: ruleConfig.visibilityConfig
          };
        })
      },
      scope: Scope.REGIONAL,
      visibilityConfig
    });

    this.webAclCapacity = webAcl.attrCapacity;
    this.webAclId = webAcl.attrId;
    this.webAclArn = webAcl.attrArn;
  }
}

/**
 * Update
 */
function generateDefaultAction(defaultAction?: DefaultAction): object {
  if (defaultAction === DefaultAction.ALLOW) {
    return {
      allow: {}
    };
  } else {
    return {
      block: {}
    };
  }
}

/**
 * Update
 */
export enum DefaultAction {

  /**
   * Update
   */
  ALLOW = 'allow',

  /**
   * Update
   */
  BLOCK = 'block',
}

/**
 * Update
 */
enum Scope {

  /**
   * Update
   */
  CLOUDFRONT = 'CLOUDFRONT',

  /**
   * Update
   */
  REGIONAL = 'REGIONAL'
}
