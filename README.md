![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

# waterline-neo4j

Provides easy access to `neo4j` from Sails.js & Waterline, heavily relying on the great [seraph-model](https://github.com/brikteknologier/seraph-model).

This module is a Waterline/Sails adapter, an early implementation of a rapidly-developing, tool-agnostic data standard.  Its goal is to provide a set of declarative interfaces, conventions, and best-practices for integrating with all sorts of data sources.  Not just databases-- external APIs, proprietary web services, or even hardware.

Strict adherence to an adapter specification enables the (re)use of built-in generic test suites, standardized documentation, reasonable expectations around the API for your users, and overall, a more pleasant development experience for everyone.


### Installation

To install this adapter, run:

```sh
$ npm install git+https://github.com/wrousseau/sails-neo4j#beta
```

When more functionnalities will be implemented (and tested hopefully), the package will be published on npm.

### Usage

This adapter exposes the following methods:

###### `find()`

+ **Status**
  + Implemented
  + Case Insensitive behavior applied

###### `create()`

+ **Status**
  + Implemented
  + createdAt and updatedAt are modified by seraph-model => change back required

###### `update()`

+ **Status**
  + Planned

###### `destroy()`

+ **Status**
  + Planned



### Interfaces

>TODO:
>We are aiming at providing for now basic CRUD functionnalities.
>A goal is to implement the [semantic]() and [queryable]() intefaces for now.

### Running the tests

Configure the interfaces you plan to support (and targeted version of Sails/Waterline) in the adapter's `package.json` file:

In the adapter's directory (once it is installed for instance or if you just cloned the repository), run

```sh
$ npm test
```

Since the adapter does not yet fully implement any interface, no tests will be launched.


### Issues, enhancements?

Submit an issue, a pull request or better yet let's talk to expand this adapter.



### More Resources

- [Stackoverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [#sailsjs on Freenode](http://webchat.freenode.net/) (IRC channel)
- [Twitter](https://twitter.com/sailsjs)
- [Professional/enterprise](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#are-there-professional-support-options)
- [Tutorials](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#where-do-i-get-help)
- <a href="http://sailsjs.org" target="_blank" title="Node.js framework for building realtime APIs."><img src="https://github-camo.global.ssl.fastly.net/9e49073459ed4e0e2687b80eaf515d87b0da4a6b/687474703a2f2f62616c64657264617368792e6769746875622e696f2f7361696c732f696d616765732f6c6f676f2e706e67" width=60 alt="Sails.js logo (small)"/></a>


### License

**[MIT](./LICENSE)**
&copy; 2014 [balderdashy](http://github.com/balderdashy) & [contributors]
[Mike McNeil](http://michaelmcneil.com), [Balderdash](http://balderdash.co) & contributors

[Sails](http://sailsjs.org) is free and open-source under the [MIT License](http://sails.mit-license.org/).


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/waterline-neo4j/README.md)


