package com.google.sps.servlets;

public class Comment {
    String comment;
    double sentimentScore;
    long timestamp; 

    public Comment(String comment, double sentimentScore, long timestamp) {
        this.comment = comment;
        this.sentimentScore = sentimentScore;
        this.timestamp = timestamp;
    }
}