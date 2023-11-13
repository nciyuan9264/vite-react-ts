const express = require('express');
const app = express();
const neo4j = require('neo4j-driver');
const cors = require('cors');
// 连接到Neo4j数据库
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));
app.use(cors());


// 路由示例
app.get('/getNodes', async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (n)-[r]->(m) RETURN n, r, m');
        const data = result.records.map(record => {
            const n = record.get('n').properties;
            const r = record.get('r').type;
            const m = record.get('m').properties;
            return { n, r, m }; // 将数据构建为对象并返回
        });
        res.json(data); 
    } catch (error) {
        console.error('Neo4j查询出错', error);
        res.status(500).send('Neo4j查询出错');
    } finally {
        session.close();
    }
});

// 启动服务器
const port = 3100;
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});