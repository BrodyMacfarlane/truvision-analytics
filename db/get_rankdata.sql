select b.backofficeid, a.associateid, b.firstname, b.lastname, b.rank, a.value from retentionvalue a
join seniorandabove b on a.associateid = b.associateid
where b.rank = $1
order by a.value asc