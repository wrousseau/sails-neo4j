# FAQ (Frequently Asked Questions)


### Which version should I use?

The latest stable version in npm is always a safe bet.

```sh
$ npm install waterline-neo4j
```

[![NPM](https://nodei.co/npm/waterline-neo4j.png?downloads=true&stars=true)](https://nodei.co/npm/waterline-neo4j/)



### Where is the documentation?
+ Documentation for this module is in the README.md file.
+ Docs for the latest stable npm release of Sails itself are on [sailsjs.org](http://sailsjs.org/#!documentation).



### What is an adapter?

 Adapters expose **interfaces**, which imply a conract to implemnt certain functionality.  This allows us to guarantee conventional usage patterns across multiple models, developers, apps, and even companies, making app code more maintainable, efficient, and reliable.  Adapters are useful for integrating with databases, open APIs, internal/proprietary web services, or even hardware.


### What kind of things can I do in an adapter?

Adapters are mainly focused on providing model-contextualized CRUD methods.  CRUD stands for create, read, update, and delete.  In Sails/Waterline, we call these methods `create()`, `find()`, `update()`, and `destroy()`.

This adaptor currently only implements `create()`, `find()`, probably with some issues as tests are not yet written.


### How do I get involved?

+ [Contributing to this module](./CONTRIBUTING.md)
+ If you find a bug with this module, please submit an issue to the tracker in this repository.  Better yet, send a pull request :)



## Why would I need a custom adapter?

When building a Sails app, the sending or receiving of any asynchronous communication with another piece of hardware can be normalized into an adapter.  (viz. API integrations)

> **From Wikipedia:**
> *http://en.wikipedia.org/wiki/Create,_read,_update_and_delete*

> Although a relational database provides a common persistence layer in software applications, numerous other persistence layers exist. CRUD functionality can be implemented with an object database, an XML database, flat text files, custom file formats, tape, or card, for example.

In other words, Waterline is not just an ORM for your database.  It is a purpose-agnostic, open standard and toolset for integrating with all kinds of RESTful services, datasources, and devices, whether it's LDAP, Neo4J, or [a lamp](https://www.youtube.com/watch?v=OmcQZD_LIAE).
I know, I know... Not everything fits perfectly into a RESTful/CRUD mold!  Sometimes the service you're integrating with has more of an RPC-style interface, with one-off method names.  That's ok-- you can define any adapter methods you like! You still get all of the trickle-down config and connection-management goodness of Waterline core.

## What is an Adapter Interface?

The functionality of adapters is as varied as the services they connect.  That said, there is a standard library of methods, and a support matrix you should be aware of.  Adapters may implement some, all, or none of the interfaces below, but rest assured that **if an adapter implements one method in an interface, it should implement *all* of them**.  This is not always the case due to limitations and/or incomplete implementations, but at the very least, a descriptive error message should be used to keep developers informed of what's supported and what's not.

> For more information, check out the Sails docs, and specifically the [adapter interface reference](https://github.com/balderdashy/sails-docs/blob/master/adapter-specification.md).


### Where do I get help?

+ [Ask a question on StackOverflow](http://stackoverflow.com/questions/tagged/sailsjs?sort=newest&days=30)


### More questions?

> If you have an unanswered question that isn't covered here, and that you feel would add value for the community, please feel free to send a PR adding it to this section.







[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/waterline-neo4j/FAQ.md)
