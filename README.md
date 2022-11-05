WIP: Really fully type safe (Postgre)SQL eDSL in TypeScript, with a small generator reading SQL DDL and outputting TypeScript table definitions.


Operators:

As seperate functions? Or as methods on Expr? -> We would then need BooleanExpr, NumericExpr, ... 
Also .isNull() would have to be only accessible on Expr's that can actually be nullable...

IPV eerst select(demoDb) -> Eerst from -> en dan kan je nog kiezen later of je select of insert doet?
