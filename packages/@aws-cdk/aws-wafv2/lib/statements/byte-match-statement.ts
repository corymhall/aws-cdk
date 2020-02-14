// import { Construct } from '@aws-cdk/core';
// import { WebAcl } from '../web-acl';
// import { BaseMatchStatementProps, Statement, StatementConfig } from './statement';
// import { returnFieldToMatchValue } from './utils';
//
// /**
//  * Update
//  */
// export interface ByteMatchStatementProps extends BaseMatchStatementProps {}
//
// /**
//  *
//  */
// export class ByteMatchStatement extends Statement {
//   constructor(private readonly props: ByteMatchStatementProps) {
//     super();
//   }
//
//   public bind(_scope: Construct, _webAcl: WebAcl): StatementConfig {
//     return {
//       name: 'ByteMatchStatement',
//       value: {
//         TextTransformations: this.props.textTransformations,
//         ...returnFieldToMatchValue(this.props.fieldToMatch, this.props.fieldToMatchValue)
//       }
//     };
//   }
// }
