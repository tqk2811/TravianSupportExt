class Profile {
    public static Render(): void {
        if (window.location.pathname.startsWith("/profile")) {
            Profile.PopTracker();
        }
    }

    static PopTracker() : void{
        
    }

}