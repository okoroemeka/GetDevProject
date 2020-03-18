import dotenv from 'dotenv';

dotenv.config();

const { APP_BASE_URL } = process.env;

export default {
  swagger: '2.0',
  info: {
    description: `Welcome to the documentation of Open API. The base url for working with this api is ${APP_BASE_URL}/api`,
    version: '1.0.0',
    title: 'Open API',
    contact: {
      name: 'Open API',
      url: 'https://github.com/okoroemeka/server-template'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: APP_BASE_URL,
  basePath: '/api',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'users',
      description: 'The users of Open API'
    },
    {
      name: 'articles',
      description: 'The articles created by Open API users'
    }
  ],
  schemes: ['https', 'http'],
  paths: {
    '/signup': {
      post: {
        tags: ['users'],
        summary: 'Create new user',
        description: '',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'New user that wants to signup',
            schema: {
              properties: {
                fullname: {
                  required: true,
                  type: 'string',
                  in: 'formData'
                },
                email: {
                  required: true,
                  type: 'string',
                  in: 'formData'
                },
                password: {
                  required: true,
                  type: 'string',
                  in: 'formData'
                },
                bio: {
                  required: true,
                  type: 'string',
                  in: 'formData'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Successfull operation',
            schema: {
              properties: {
                message: {
                  type: 'string'
                },
                token: {
                  type: 'string'
                }
              },
              example: {
                status: 'Success',
                payload: {
                  userInfo: {
                    id: 19,
                    fullname: 'okoro emeka',
                    email: 'solesdeogm@emeka.com',
                    password: '',
                    bio: 'great writer',
                    updatedAt: '2020-03-17T07:55:36.990Z',
                    createdAt: '2020-03-17T07:55:36.990Z'
                  }
                },
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyNSwidXNlcm5hbWUiOiJtYXJjNTAifSwiaWF0IjoxNTQzNzAxMTY2LCJleHAiOjE1NDQ1NjUxNjZ9.jbGxB1LwW3CpT9KyFq9hXdSeztQ8xLrFWE-DQszcmkk'
              }
            }
          },
          400: {
            description: 'Validation exception',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                }
              },
              example: { status: 'Success', message: 'invalid input' }
            }
          }
        }
      }
    },
    '/login': {
      post: {
        tags: ['users'],
        summary: 'Login user to the app',
        description: '',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'Existing user that want to login',
            schema: {
              properties: {
                email: {
                  required: true,
                  type: 'string',
                  in: 'formData'
                },
                password: {
                  required: true,
                  type: 'string',
                  in: 'formData'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              properties: {
                message: {
                  type: 'string'
                },
                token: {
                  type: 'string'
                }
              },
              example: {
                status: 'Success',
                payload: {
                  email: 'solesom@emeka.com',
                  token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxNiwiZW1haWwiOiJzb2xlc29tQGVtZWthLmNvbSJ9LCJpYXQiOjE1ODQ0MzY1NDUsImV4cCI6MTU4NDQ1MDk0NX0.RKoyXkMgIIQP06WbozD8_DWsND1hR9NKL6tnyDaRUqA'
                }
              }
            }
          },
          400: {
            description: 'Invalid login credentials',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                }
              },
              example: { status: 'Fail', Message: 'Invalid input' }
            }
          }
        }
      }
    },
    '/writers': {
      get: {
        tags: ['users'],
        summary: 'Get all writers',
        operationId: 'WritersGet',
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              properties: {
                message: {
                  type: 'string'
                },
                payload: {
                  type: 'object'
                }
              },
              example: {
                status: 'Success',
                payload: {
                  email: 'solesom@emeka.com',
                  payload: {
                    count: 12,
                    rows: [
                      {
                        id: 1,
                        fullname: 'okoro emeka',
                        bio: 'great writer',
                        email: 'okoro@emeka.com',
                        password:
                          '$2b$10$FDvO9coEQyvXawAzr9woX.3848FsWYZPsBIxnfKejCBTiEz4Tg/he',
                        createdAt: '2020-03-16T18:28:51.000Z',
                        updatedAt: '2020-03-16T18:28:51.000Z'
                      },
                      {
                        id: 3,
                        fullname: 'okoro emeka',
                        bio: 'great writer',
                        email: 'okoros@emeka.com',
                        password:
                          '$2b$10$4Ji2RMG1I1m3SeVv.IxXa.RXkVjXIaQIc9.jJUbq4De3K0VXcKsjS',
                        createdAt: '2020-03-16T18:30:01.000Z',
                        updatedAt: '2020-03-16T18:30:01.000Z'
                      },
                      {
                        id: 4,
                        fullname: 'okoro emeka',
                        bio: 'great writer',
                        email: 'okorwos@emeka.com',
                        password:
                          '$2b$10$wxC5pV/Saz.OWnLrUiCRa.yU4p4oKfDdcfWuDbRgTlSqp6qzAP0Hm',
                        createdAt: '2020-03-16T18:31:03.000Z',
                        updatedAt: '2020-03-16T18:31:03.000Z'
                      }
                    ]
                  }
                }
              }
            }
          },
          404: {
            description: 'No writer found',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                }
              },
              example: { status: 'Fail', Message: 'No writer found' }
            }
          }
        }
      }
    },
    '/articles': {
      post: {
        tags: ['articles'],
        summary: 'Create article',
        description: '',
        parameters: [
          {
            name: 'article',
            in: 'body',
            required: true,
            description: '',
            schema: {
              properties: {
                title: {
                  required: true,
                  type: 'string'
                },
                body: {
                  required: true,
                  type: 'string'
                }
              }
            }
          }
        ],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                payload: {
                  type: 'object'
                }
              },
              example: {
                status: 'Success',
                payload: {
                  id: 6,
                  title: 'new man',
                  body: 'we came',
                  userId: 16,
                  updatedAt: '2020-03-17T09:21:20.125Z',
                  createdAt: '2020-03-17T09:21:20.125Z'
                }
              }
            }
          },
          400: {
            description: 'Invalid input',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                }
              },
              example: { status: 'Success', message: 'invalid input' }
            }
          }
        }
      },
      get: {
        tags: ['articles'],
        summary: 'Get all article',
        operationId: 'ArticlesGet',
        produces: ['application/json'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: ''
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                payload: {
                  type: 'object'
                }
              },
              example: {
                status: 'Success',
                payload: {
                  count: 5,
                  rows: [
                    {
                      id: 1,
                      title: 'new man',
                      body: 'we came',
                      userId: 1,
                      createdAt: '2020-03-17T08:56:40.000Z',
                      updatedAt: '2020-03-17T08:56:40.000Z'
                    },
                    {
                      id: 2,
                      title: 'new man',
                      body: 'we came',
                      userId: 1,
                      createdAt: '2020-03-17T09:16:38.000Z',
                      updatedAt: '2020-03-17T09:16:38.000Z'
                    }
                  ]
                }
              }
            }
          },
          404: {
            description: 'No article found',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                message: {
                  type: 'object'
                }
              },
              example: { status: 'Fail', message: 'No article found' }
            }
          }
        }
      }
    },
    '/articles?Id=<articleId>': {
      patch: {
        tags: ['articles'],
        summary: 'Update/Edit an article',
        description: 'Updates/Edit an article',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            type: 'string',
            name: 'articleId',
            in: 'path',
            required: true
          },
          {
            type: 'string',
            name: 'Authorization',
            description: 'Authorization token',
            required: true,
            in: 'header'
          },
          {
            type: 'string',
            name: 'title',
            in: 'path',
            required: false
          },
          {
            type: 'string',
            name: 'body',
            required: false,
            in: 'formData'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                payload: {
                  type: 'object'
                }
              },
              example: {
                status: 'Success',
                payload: {}
              }
            }
          },
          404: {
            description: 'resource not found',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                payload: {
                  type: 'number'
                }
              },
              example: {
                status: 'Fail',
                Message: 'Article does not exist'
              }
            }
          }
        }
      },
      delete: {
        tags: ['articles'],
        summary: 'Delete an article',
        operationId: 'UnnammedEndpointDelete',
        produces: ['application/json'],
        parameters: [
          {
            type: 'string',
            name: 'articleId',
            in: 'path',
            required: true
          },
          {
            type: 'string',
            name: 'Authorization',
            description: 'Authorization token',
            required: true,
            in: 'header'
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                payload: {
                  type: 'number'
                }
              },
              example: {
                status: 'Success',
                payload: 1
              }
            }
          },
          404: {
            description: 'resource not found',
            schema: {
              properties: {
                status: {
                  type: 'string'
                },
                payload: {
                  type: 'number'
                }
              },
              example: {
                status: 'Fail',
                Message: 'Article does not exist'
              }
            }
          }
        }
      }
    }
  }
};
