import { expect as cdkExpect, haveResource } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import { Stack } from '@aws-cdk/core';
import * as wafv2 from '../lib';

test('Simple wafv2 test', () => {
  const stack = new Stack();
  new wafv2.WebAcl(stack, 'MyWaf', {
    rules: [wafv2.Rule.blockXss({
      fieldToMatch: wafv2.FieldToMatch.ALL_QUERY_ARGUMENTS,
      textTransformations: {
        type: wafv2.TextTransformationType.NONE,
        priority: 1
      }
    })]
  });

  cdkExpect(stack).to(haveResource('AWS::WAFv2::WebACL', {
    DefaultAction: {
      Block: {}
    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
    },
    Rules: {
      Rules: [
        {
          Action: {
            Block: {}
          },
          VisibilityConfig: {
            SampledRequestsEnabled: true,
            CloudWatchMetricsEnabled: true,
          },
          Statement: {
            XssMatchStatement: {
              FieldToMatch: {
                AllQueryArguments: {}
              },
              TextTransformations: {
                TextTransformations: [
                  {
                    Priority: 1,
                    Type: "NONE"
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }));

});

test('Simple wafv2 test, visibility disabled', () => {
  const stack = new Stack();
  new wafv2.WebAcl(stack, 'MyWaf', {
    rules: [wafv2.Rule.blockXss({
      fieldToMatch: wafv2.FieldToMatch.ALL_QUERY_ARGUMENTS,
      textTransformations: {
        type: wafv2.TextTransformationType.NONE,
        priority: 1
      }
    },
    {
      visibility: wafv2.Visibility.disable()
    })],
    visibility: wafv2.Visibility.disable()
  });

  cdkExpect(stack).to(haveResource('AWS::WAFv2::WebACL', {
    DefaultAction: {
      Block: {}
    },
    VisibilityConfig: {
      SampledRequestsEnabled: false,
      CloudWatchMetricsEnabled: false,
    },
    Rules: {
      Rules: [
        {
          Action: {
            Block: {}
          },
          VisibilityConfig: {
            SampledRequestsEnabled: false,
            CloudWatchMetricsEnabled: false,
          },
          Statement: {
            XssMatchStatement: {
              FieldToMatch: {
                AllQueryArguments: {}
              },
              TextTransformations: {
                TextTransformations: [
                  {
                    Priority: 1,
                    Type: "NONE"
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }));

});

test('wafv2 test with multiple rules', () => {
  const stack = new Stack();
  new wafv2.WebAcl(stack, 'MyWaf', {
    rules: [
      wafv2.Rule.blockXss({
        fieldToMatch: wafv2.FieldToMatch.ALL_QUERY_ARGUMENTS,
        textTransformations: {
          type: wafv2.TextTransformationType.NONE,
          priority: 1
        }
      }),
      wafv2.Rule.blockXss({
        fieldToMatch: wafv2.FieldToMatch.BODY,
        textTransformations: {
          type: wafv2.TextTransformationType.NONE,
          priority: 1
        }
      })
    ]
  });

  cdkExpect(stack).to(haveResource('AWS::WAFv2::WebACL', {
    DefaultAction: {
      Block: {}
    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
    },
    Rules: {
      Rules: [
        {
          Action: {
            Block: {}
          },
          VisibilityConfig: {
            SampledRequestsEnabled: true,
            CloudWatchMetricsEnabled: true,
          },
          Statement: {
            XssMatchStatement: {
              FieldToMatch: {
                AllQueryArguments: {}
              },
              TextTransformations: {
                TextTransformations: [
                  {
                    Priority: 1,
                    Type: "NONE"
                  }
                ]
              }
            }
          }
        },
        {
          Action: {
            Block: {}
          },
          VisibilityConfig: {
            SampledRequestsEnabled: true,
            CloudWatchMetricsEnabled: true,
          },
          Statement: {
            XssMatchStatement: {
              FieldToMatch: {
                Body: {}
              },
              TextTransformations: {
                TextTransformations: [
                  {
                    Priority: 1,
                    Type: "NONE"
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }));

});
