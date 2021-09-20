$(function(){
    let is_githubio = localStorage.getItem('inject_resource_githubio');
    if(is_githubio == null) is_githubio = "false";
    $("#cb_inject_resource_githubio").prop('checked', is_githubio == "true");


    $("#cb_inject_resource_githubio").change(function(){
        localStorage.setItem("inject_resource_githubio",$("#cb_inject_resource_githubio").prop("checked"));
    });
});