import { Construct } from '@aws-cdk/core';
import { WebAcl } from '../web-acl';
import { BaseMatchStatementProps, Statement, StatementConfig } from './statement';
import { returnFieldToMatchValue } from './utils';

/**
 * Update
 */
export interface XssMatchStatementProps extends BaseMatchStatementProps {}

/**
 * Update
 */
export class XssMatchStatement extends Statement {
  constructor(private readonly props: XssMatchStatementProps) {
    super();
  }

  /**
   * Update
   */
  public bind(_scope: Construct, _webAcl: WebAcl): StatementConfig {
    if (this.props) {
      return {
        config: {
          xssMatchStatement: {
            textTransformations: this.props.textTransformations === undefined ? [] : this.props.textTransformations.map((text, index) => {
              return {
                priority: text.priority ?? index,
                type: text.type
              };
            }),
            fieldToMatch: returnFieldToMatchValue(this.props.fieldToMatch, this.props.fieldToMatchValue)
          }
        }
      };
    } else {
      return {
        config: {
          xssMatchStatement: {}
        }
      };
    }
  }
}
