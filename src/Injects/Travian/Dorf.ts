class Dorf{
    public static Render(): void{
        if(window.location.pathname.startsWith("/dorf")){
            //red att
            $("#movements .att1").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=1");

            //Violet att (oasis)
            $("#movements .att3").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=1");

            //def green in
            $("#movements .def1").parent().attr("href","/build.php?gid=16&tt=1&filter=1&subfilters=2,3");

            //def yellow out
            $("#movements .def2").parent().attr("href","/build.php?gid=16&tt=1&filter=2&subfilters=5");

        }
    }
}