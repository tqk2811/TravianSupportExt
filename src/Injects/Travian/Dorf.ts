class Dorf{
    public static Render(): void{
        if(window.location.pathname.startsWith("/dorf")){
            $("#movements .def1").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=2,3");//all def in
            $("#movements .def2").parent().attr("href","/build.php?gid=16&tt=1&filter=2&subfilters=5");//def yellow out
            $("#movements .def3").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=2,3");//all def in

            $("#movements .att1").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=1");//red att
            $("#movements .att2").parent().attr("href","/build.php?gid=16&tt=1&filter=2&subfilters=4");//att yellow out
            $("#movements .att3").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=1");//Violet att (oasis)

            $("#troops .unit").parent().attr("href","/build.php?gid=16&tt=1&filter=3");
        }
    }
}