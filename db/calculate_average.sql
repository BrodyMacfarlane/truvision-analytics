with recursive ret (distributorid, uplineid) as (
    select a.distributorid, a.uplineid from enrollmenttree a
    where a.distributorid = $1
    union
    select b.distributorid, b.uplineid from enrollmenttree b
    inner join ret on ret.distributorid = b.uplineid
)
select avg(timeactive) PercentageTimeActive from
(
select a.distributorid, coalesce(b.timeactive, 0) timeactive from ret a
full join retention b on a.distributorid = b.associateid
where a.distributorid is not null
) a