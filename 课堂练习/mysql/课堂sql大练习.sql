SELECT * 
FROM emp,dept
WHERE emp.deptno = dept.deptno;


SELECT emp.empno,emp.ename,dept.dname,salgrade.grade
FROM emp,dept,salgrade
WHERE emp.deptno = dept.deptno and emp.sal BETWEEN salgrade.losal AND salgrade.hisal 
ORDER BY salgrade.grade;


SELECT emp.empno,emp.ename,salgrade.grade
FROM emp,salgrade
WHERE emp.sal >salgrade.losal AND emp.sal <salgrade.hisal;

-- 查询出ACCOUNTING部门中最高的月薪
SELECT Max(emp.sal)
FROM emp 
INNER JOIN dept ON emp.deptno = dept.deptno AND dept.dname =  'ACCOUNTING';

-- 查询出每个部门的最高月薪以及部门名称
SELECT MAX(emp.sal),dept.dname
FROM emp 
INNER JOIN dept on emp.deptno = dept.deptno
GROUP BY dept.deptno;

-- 查询出每个部门的平均月薪，并按照平均薪资从高到低排序
SELECT dept.dname,AVG(emp.sal)
FROM emp 
INNER JOIN dept on emp.deptno = dept.deptno
GROUP BY dept.deptno
ORDER BY AVG(emp.sal) DESC;


SELECT emp.*,dept.*
FROM emp
LEFT JOIN dept
ON emp.deptno = dept.deptno;

SELECT emp.*,dept.*
FROM emp
RIGHT JOIN dept
ON emp.deptno = dept.deptno;



-- 2.查询dept的所有列
SELECT * FROM dept

-- 3.查询emp中ename、sal、job、deptno列
SELECT ename,sal,job,deptno
FROM emp

-- 4.查询emp表中deptno列并取消重复行
SELECT DISTINCT deptno FROM emp


-- 5.查询SMITH的薪水、工作、所在部门（emp表);
SELECT sal,job,deptno
FROM emp WHERE ename = 'SMITH'

-- 6.查看emp中有多少条数据；
SELECT count(*) FROM
emp ;
-- 7.显示每个雇员的年薪；
SELECT ename,sal*12 +COALESCE(comm,0) *13  FROM emp ;
-- 8.查询emp表中雇员姓名、年薪（月薪*12+补助*13），补助可能为null；
SELECT ename,sal*12 +COALESCE(comm,0)*13 FROM emp;

-- 10.查询工资高于3000的员工；
SELECT * FROM emp WHERE sal >3000;

-- 11.查询1982.1.1后入职的员工；
SELECT * FROM emp WHERE hiredate>'1982-1-1' 


-- 12.查询工资在2000到2500的员工情况；
SELECT * FROM emp where	sal BETWEEN 2000 AND 2500;

-- 13.查询首字符为S的员工姓名和工资；
SELECT ename,sal FROM emp WHERE ename LIKE 'S%'
-- 14.查询第三个字符为大写O的所有员工姓名和工资；
SELECT ename,sal  FROM  emp WHERE ename LIKE '__O%';


-- 15.查询empno为7844,456,800的雇员情况；
SELECT * FROM emp WHERE empno in(7844,456,800);
 

-- 16.查询没有上级的雇员的情况(使用is null的操作符)
SELECT  * FROM emp WHERE comm is NULL;

-- 17.使用逻辑操作符号，查询工资高于500或是岗位为manager的雇员，同时还要满足姓名首字母为大写的J；
SELECT * FROM emp WHERE (sal >500 OR job = 'MANAGER' ) AND ename LIKE'J%';
-- 18.按照工资从低到高显示雇员的信息；
SELECT * FROM emp  ORDER BY sal ;


-- 19.按照部门号升序而雇员的工资降序排列；
SELECT * FROM emp ORDER BY deptno,sal DESC; 
-- 20.使用列的别名排序；
SELECT sal 薪资 FROM emp ORDER BY 薪资;


-- 21.查询emp中最高和最低工资；
SELECT MAX(sal),MIN(sal) FROM emp ;


-- 22.查询平均工资和工资总和；
SELECT AVG(sal),SUM(sal) FROM emp ;


-- 23.查询共有多少员工；
SELECT COUNT(*) FROM emp ;



-- 24.查询工资最高的员工姓名、工作岗位；
SELECT  ename,job
FROM emp
WHERE sal = (SELECT MAX(sal) FROM emp);



-- 25.查询工资高于平均工资的员工信息；
SELECT * 
FROM emp
WHERE sal > (SELECT AVG(sal) FROM emp )


-- 26.查询每个部门的平均工资和最高工资；
SELECT AVG(sal),MAX(sal),deptno
FROM emp 
GROUP by deptno;

-- 27.查询每个部门的每种岗位的平均工资和最低工资；
SELECT AVG(sal),MIN(sal),deptno ,job
FROM emp 
GROUP BY deptno ,job;



-- 28.查询平均工资低于2000的部门号和它的平均工资；
SELECT deptno, AVG(sal)
FROM emp
WHERE sal <(
SELECT avg(sal)
FROM emp
)
GROUP BY deptno;


-- 29.显示雇员名、雇员工资及所在部门的名字；
SELECT ename,sal,dname
FROM emp,dept
WHERE emp.deptno = dept.deptno;



-- 30.显示部门号为10的部门名、员工名和工资；
SELECT dname,ename,sal,emp.deptno
FROM emp 
JOIN dept ON emp.deptno =10 and dept.deptno =10;


-- 31.显示各个员工的姓名、工资及其工资的级别；
SELECT ename,sal,grade
FROM emp , dept ,salgrade

WHERE emp.deptno = dept.deptno AND emp.sal BETWEEN salgrade.losal AND salgrade.hisal;

-- 32.显示雇员名、工资及所在部门的名字，并按部门排序；
SELECT ename,sal,dname,dept.deptno
FROM emp 
INNER JOIN dept
ON emp.deptno =dept.deptno 
ORDER BY dept.deptno;


-- 33.查询‘FORD’的上级领导的姓名（两种方式）；
SELECT ename
FROM emp 
WHERE emp.empno = (
SELECT mgr 
FROM emp 
WHERE emp.ename =  'FORD'
)
-- 34.查询与SMITH同一部门的所有员工；
SELECT * 
FROM emp
WHERE deptno =  (
SELECT deptno 
FROM emp
WHERE emp.ename ='SMITH'
)

-- 35.查询和部门10的工作相同的雇员的名字、岗位、工资、部门号；
SELECT ename,job,sal,deptno 
FROM emp 
WHERE job in(
SELECT job 
FROM emp
WHERE deptno =10
);


-- 36.查询工资比部门30的所有员工的工资高的员工的姓名、工资和部门号；
SELECT ename,sal,deptno
FROM emp 
WHERE sal >(
SELECT MAX(sal)
FROM emp
WHERE deptno =30
)


37.查询工资比部门30的任意一个员工的工资高的员工的姓名、工资、部门号；

-- 38.查询与SMITH的部门和岗位完全相同的所有雇员；
SELECT * 
FROM emp 
WHERE deptno = (
SELECT deptno
FROM emp
WHERE emp.ename = 'SMITH'
)
AND 

job = (
SELECT job
from emp
WHERE emp.ename = 'SMITH'
);



-- 39.查询高于自己部门平均工资的员工的信息；
SELECT * 
FROM emp 
INNER JOIN (
SELECT deptno,avg(sal) avg_sal
FROM emp
GROUP BY deptno
) d ON emp.deptno = d.deptno
WHERE emp.sal >d.avg_sal



-- 40.查询emp表，显示薪水大于2000，且工作类别是MANAGER的雇员信息
SELECT * 
FROM emp
WHERE sal> 2000 && job = 'MANAGER';


-- 41.查询emp表，显示年薪大于30000，工作类别不是MANAGER的雇员信息
SELECT *
FROM emp
WHERE sal*12+COALESCE(comm,0)*13 > 30000 AND  job !='MANAGER';




-- 42.查询emp表， 显示薪水在1500到3000之间，工作类别以“M”开头的雇员信息
SELECT * 
FROM emp 
WHERE (sal BETWEEN 1200 AND 3000 )AND ename LIKE 'M%';

-- 43.查询emp表，显示佣金为空并且部门号为20或30的雇员信息  
SELECT * 
FROM emp
WHERE comm is NULL AND (emp.deptno=20 || emp.deptno =30); 
 

-- 44.查询emp表，显示佣金不为空或者部门号为20的雇员信息，要求按照薪水降序排列

SELECT *
FROM emp
WHERE comm is not NULL OR emp.deptno = 20 
ORDER BY emp.sal DESC;

-- 45.查询emp表，显示年薪大于30000工作类别不是MANAGER，且部门号不是10或40的雇员信息，要求按照雇员姓名进行排列
SELECT * 
FROM emp
WHERE  sal*12+COALESCE(comm,0)*13 >30000 and job <>'MANAGER' AND deptno <> 10  AND deptno <> 40;


-- 46.查询EMP、DEPT表，输出的列包含员工姓名、工资、部门编号、部门名称、部门地址
SELECT emp.ename,emp.sal,dept.deptno, dept.dname,dept.loc
FROM emp,dept 
WHERE emp.deptno = dept.deptno ;

-- 47.使用自连接查询EMP表，输出的列包含员工姓名、主管姓名
SELECT  e1.ename as 员工姓名,e2.ename as 主管姓名
FROM emp e1 inner JOIN emp e2
ON e1.mgr = e2.empno;


-- 48.在第47题的基础上，思考下为什么输出结果没有KING的信息？ 如果要输出KING的信息，如何修改？
	
SELECT  e1.ename as 员工姓名,e2.ename as 主管姓名
FROM emp e1 LEFT JOIN emp e2
ON e1.mgr = e2.empno;

	
-- 49.使用左连接查询员工部门，包括没有员工的部门信息，输出列：部门编号、部门名称、位置。 --（左表为dept表，emp为右表）
SELECT dept.deptno,dept.dname,dept.loc 
FROM dept  LEFT JOIN emp
ON dept.deptno = emp.deptno;

-- 50.查询EMP表，输出每个部门的平均工资，并按部门编号降序排列.
SELECT emp.deptno,AVG(sal)
FROM emp 
GROUP BY deptno
ORDER BY deptno DESC;

-- 51.查询EMP表，输出每个职位的平均工资，按平均工资升序排列.
SELECT deptno,AVG(sal)
FROM emp 
GROUP BY deptno 
ORDER BY AVG(sal) ;


-- 52.查询EMP表，输出每个部门的各个职位的平均工资，并按部门编号升序、平均工资降序排序。
SELECT   deptno, job,avg(sal)
FROM emp 
GROUP BY deptno,job
ORDER BY deptno , avg(sal) DESC;




-- 53.使用子查询，找出哪个部门下没有员工
SELECT dept.dname
FROM dept 
WHERE dept.deptno not in (
SELECT deptno
FROM emp
) 

-- 54.使用子查询，找出那些工资低于所有部门的平均工资的员工
SELECT e1.*
FROM emp e1
 INNER JOIN (
 SELECT deptno,avg(sal) avg_sal
 FROM emp 
 GROUP BY deptno
 ) e2
 ON e1.deptno = e2.deptno
WHERE e1.sal < e2.avg_sal;	

-- 55.使用子查询，找出那些工资低于任意部门的平均工资的员工，比较一下与第15题输出的结果是否相同？
SELECT e1.*
FROM emp e1
 INNER JOIN (
 SELECT deptno,avg(sal) avg_sal
 FROM emp 
 GROUP BY deptno
 ) e2
 ON e1.deptno = e2.deptno
WHERE e1.sal < e2.avg_sal;	




