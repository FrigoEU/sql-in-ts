WIP: Really fully type safe (Postgre)SQL eDSL in TypeScript, with a small generator reading SQL DDL and outputting TypeScript table definitions.


Operators:

As seperate functions? Or as methods on Expr? -> We would then need BooleanExpr, NumericExpr, ... 
Also .isNull() would have to be only accessible on Expr's that can actually be nullable...

IPV eerst select(demoDb) -> Eerst from -> en dan kan je nog kiezen later of je select of insert doet?

Capturing GROUP_BY errors seems insanely hard, eg:

SELECT user_id, json_build_object('bl', emails.id) FROM ... GROUP BY user_id
-> fails
SELECT user_id, ARRAY_AGG(json_build_object('bl', emails.id)) FROM ... GROUP BY user_id
-> works : NOTE: is that because json_build_object is not an aggregate function?
=> Might be possible, once we groupby we can only use a/ grouped on expressions, b/ aggregate functions

SQL Optimization: https://github.com/tobymao/sqlglot/blob/main/posts/python_sql_engine.md#optimizing
