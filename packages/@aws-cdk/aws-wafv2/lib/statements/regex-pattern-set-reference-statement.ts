// import { Construct } from '@aws-cdk/core';
// import { WebAcl } from '../web-acl';
// import { BaseMatchStatementProps, Statement, StatementConfig } from './statement';
// import { returnFieldToMatchValue } from './utils';
//
// export interface RegexPatternSetReferenceStatementProps extends BaseMatchStatementProps {
//   regexPatternSet?: IRegexPatternSet;
// }
//
// export class RegexPatternSetReferenceStatement extends Statement {
//   constructor(private readonly props: RegexPatternSetReferenceStatementProps) {
//     super();
//   }
//
//   public bind(_scope: Construct, _webAcl: WebAcl): StatementConfig {
//     return {
//       name: 'RegexPatternSetReferenceStatement',
//       value: {
//         Arn: this.props.regexPatternSet.attrArn,
//         TextTransformations: this.props.textTransformations,
//         ...returnFieldToMatchValue(this.props.fieldToMatch, this.props.fieldToMatchValue)
//       }
//     };
//   }
// }
//
