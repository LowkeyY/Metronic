/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Java, com, ConnectionManager, cunovs, java, e*/

var cunovsDB = function (dbname) {
    this.init(dbname);
};

cunovsDB.prototype = {
    strCls: Java.type("java.lang.String"),
    str1Cls: Java.type("java.lang.String[]"),
    str2Cls: Java.type("java.lang.String[][]"),
    init: function (dbname) {
        this.db = this.getDB(dbname);
    },
    getDB: function (dbname) {
        if(this.db && !dbname)
            return this.db;
        if (dbname) {
            var imports = new JavaImporter(com.susing.sql, com.kinglib.Connection);
            with (imports) {
                if (!this.cm)
                    this.cm = ConnectionManager.currentManager();
                return (this.db = new com.kinglib.Connection(this.cm.getConnection(dbname)));
            }
        }
        return null;
    },
    get: function () {
        if (arguments.length > 0) {
            var args = Array.prototype.slice.call(arguments, 0);
            if (args.length === 3 && (+args[1]))
                args.splice(1, 0, null);
            return this.getBySql.apply(this, args);
        }
        throw {err : true , message : "未获取数据库链接。"};
    },
    getBySql: function (sql, param, start, rowCount) {
        if (this.db) 
            return this.db.get(sql, param || null, start || 0, rowCount || 0);
        throw {err : true , message : "未获取数据库链接。"};
    },
    getRow: function (sql, args) {
        if (this.db)
            return this.db.getRow(sql, args ? (cunovs.isArray(args) ? args : [args]) : null);
        throw {err : true , message : "未获取数据库链接。"};
    },
    exec: function (sql, args) {
        if (this.db) {
            if (!args){
                this.db.exec(sql);
                return {success : true};
            } else {
                if (cunovs.isArray(args) && args.length) {
                    var str2 = cunovs.isArray(args[0]);
                    this.db.exec(sql, str2 ? Java.to(args, this.str2Cls) : Java.to(args, this.str1Cls));
                    return {success : true};
                }
            }
        }
        throw {err : true , message : "未获取数据库链接。"};
    }
};