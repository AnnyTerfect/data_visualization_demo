const express = require('express')
const md5 = require('md5')

function connect() {
	const mysql = require('mysql')
	const connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'guest',
		password : 'password',
		database : 'userdata'
	})

	connection.connect()
	return connection
}

function query(conn, sql) {
	conn.query(sql, function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ', err.message)
          return
        }
 
       console.log('--------------------------SELECT----------------------------')
       console.log(result)
       console.log('------------------------------------------------------------\n\n')
	})
}

function saveData(conn, ip, table) {
	md5Ip = md5(ip)
	titles = table.titles
	rows = table.rows
	sql = 'CREATE TABLE IF NOT EXISTS ' + md5Ip + '(' + titles[0].value + ' text, ' + titles[1].value + ' text)'
	query(conn, sql)
	sql = 'DELETE FROM ' + md5Ip + ' WHERE 1'
	query(conn, sql)
	for (let i = 0; i < rows.length; i++) {
		sql = 'INSERT INTO ' + md5Ip + ' (' + titles[0].value + ', ' + titles[1].value + ') VALUES(\'' + rows[i][0].value + '\', \'' + rows[i][1].value + '\')'
		console.log(sql)
		query(conn, sql)
	}
}

app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

app.post('/api/post', function (req, res) {
	let data, body = '', jsonStr

    req.on('data', function (_data) {
        body += _data
    })

    req.on('end', function () {
        try {
            table = JSON.parse(body)
            res.setHeader('Content-Type', 'text/plain')
            let conn = connect()
            saveData(conn, req.ip, table)
            res.send({ 'status': 'successful' })
        }
        catch (err) {
        	res.setHeader('Content-Type', 'text/plain')
            res.send({ 'status': 'error' })
            console.log(err)
        }
    })
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!')
})
