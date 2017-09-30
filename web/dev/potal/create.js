/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Files, cunovs, __FILE__, Java */

cunovs.defineCalss(__FILE__, {
    service: function (jjs) {
        var type = jjs.get("type"), sys_app_id = "" , potalPath = "" , uploadPath = "" , webPath = "";
        var imports = new JavaImporter(com.susing.core.KingleSystem);
        with (imports) {
            potalPath = String.valueOf(KingleSystem.getProperty("portal_path"));
            uploadPath = String.valueOf(KingleSystem.getProperty("upload_path"));
            uploadPath = uploadPath.replaceAll("\\\\" , "/");
            if(uploadPath.indexOf("/web/")!= -1){
                webPath = uploadPath.substr(uploadPath.indexOf("/web/") + 4);
                uploadPath = uploadPath.substr(0 , uploadPath.indexOf("/web/") + 4);
            }
        }
        if (type === "delete") {
            sys_app_id = jjs.get("id");
            var db = new cunovsDB("plat");
            db.exec("delete from  potal_menu where application_id=?", [sys_app_id]);
            return cunovsFS.delete(potalPath + sys_app_id + ".json", function (ok, st) {
                return {
                    success: ok,
                    id: sys_app_id,
                    state: st
                }
            });
        } else {
            var data = JSON.parse(jjs.get("data")), db = new cunovsDB("plat");
            if (!data.sys_app_id || data.sys_app_id === "0") {
                data.sys_app_id = sys_app_id = jjs.uuid();
                type = "save";
            } else
                sys_app_id = data.sys_app_id;

            var values = [data.default_seq, data.default_title, data.default_has_auth, data.default_isValid, data.default_icon_url];

            data.default_token = data.sys_app_id.replaceAll("-", "");
            
            if(uploadPath && webPath){
                for(att in data){
                    if(att.match(/_icon_url$/ig) && data[att].startsWith(webPath)){
                        var srcPath = data[att] , prefixPath = "/themes/icon/defines" , distPath = srcPath.substr(webPath.length());
                        data[att] = (prefixPath + distPath);
                        imports = new JavaImporter(java.io.File);
                        with (imports) {
                            new File(uploadPath + srcPath).renameTo(new File(uploadPath + prefixPath + distPath));
                        }
                    }
                }
            }
            
            if (type === "save") {
                db.exec("insert into potal_menu values(?,?,?,?,?,?)", [sys_app_id].concat(values));
            } else {
                db.exec("update potal_menu set default_seq=?,default_title=?,default_has_auth=?,default_isValid=?,default_icon_url=? where application_id=? ", values.concat(sys_app_id));
            }
            return cunovsFS.write(potalPath + sys_app_id + ".json", JSON.stringify(data), function (ok, st) {
                return {
                    success: ok,
                    id: sys_app_id,
                    type: type,
                    state: st
                };
            });
        }
    }
});