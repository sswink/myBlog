package com.myBlog.entity;

public class Favourite {
    private long favouriteId;
    private String favouriteTitle;
    private String favouriteContent;
    private String favouritePic;
    private String favouriteDesc;
    private long userId;
    private String favouriteUrl;

    public long getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(long favouriteId) {
        this.favouriteId = favouriteId;
    }

    public String getFavouriteTitle() {
        return favouriteTitle;
    }

    public void setFavouriteTitle(String favouriteTitle) {
        this.favouriteTitle = favouriteTitle;
    }

    public String getFavouriteContent() {
        return favouriteContent;
    }

    public void setFavouriteContent(String favouriteContent) {
        this.favouriteContent = favouriteContent;
    }

    public String getFavouritePic() {
        return favouritePic;
    }

    public void setFavouritePic(String favouritePic) {
        this.favouritePic = favouritePic;
    }

    public String getFavouriteDesc() {
        return favouriteDesc;
    }

    public void setFavouriteDesc(String favouriteDesc) {
        this.favouriteDesc = favouriteDesc;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getFavouriteUrl() {
        return favouriteUrl;
    }

    public void setFavouriteUrl(String favouriteUrl) {
        this.favouriteUrl = favouriteUrl;
    }
}
