import { Statement } from './statement';
import { XssMatchStatement, XssMatchStatementProps } from './xss-match-statement';

/**
 * The base class for rule statements
 */
export class Statements {
  /**
   * Update
   */
  public static xssMatchStatement(props: XssMatchStatementProps): Statement {
    return new XssMatchStatement(props);
  }
}
