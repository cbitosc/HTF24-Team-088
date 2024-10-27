import React, { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Bookmark, Link2 } from 'lucide-react';

export default function ArticleCard({ article, onLike, onDislike }) {
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [saved, setSaved] = useState(false);

    const userId = localStorage.getItem('userId') || '671d663c60819ecd6a91e985';

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                const response = await fetch('http://localhost:8000/articles/details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: article.url }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch article details');
                }

                const data = await response.json();
                setLikesCount(data.likes_count || 0);
                setDislikesCount(data.dislikes_count || 0);
            } catch (error) {
                console.error('Error fetching article details:', error);
                setLikesCount(0);
                setDislikesCount(0);
            }
        };

        const fetchUserInteraction = async () => {
            try {
                const [likesResponse, dislikesResponse, savedResponse] = await Promise.all([
                    fetch(`http://localhost:8000/likes/${userId}`),
                    fetch(`http://localhost:8000/dislikes/${userId}`),
                    fetch(`http://localhost:8000/saved/${userId}`)
                ]);

                const likedArticles = await likesResponse.json();
                const dislikedArticles = await dislikesResponse.json();
                const savedArticles = await savedResponse.json();

                // Check if the current article is liked, disliked, or saved
                console.log(article.url);

                const fetchHash = async (url) => {
                    try {
                        const response = await fetch(`http://localhost:8000/hash`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url }) // Send the URL as JSON
                        });
                        if (!response.ok) {
                            throw new Error('Failed to fetch hash');
                        }
                        const data = await response.json();
                        return data.article_id; // Return the article ID
                    } catch (error) {
                        console.error('Error fetching hash:', error);
                        return null; // Return null in case of an error
                    }
                };
                
                const article_id = await fetchHash(article.url);
                console.log(article_id, likedArticles);
                setLiked(likedArticles.liked_articles.includes(article_id));
                setDisliked(dislikedArticles.disliked_articles.includes(article_id));
                setSaved(savedArticles.saved_articles.includes(article_id));
            } catch (error) {
                console.error('Error fetching user interactions:', error);
            }
        };

        fetchArticleDetails();
        fetchUserInteraction();
    }, [article.url, userId]); // Fetch details and user interaction when the article URL or user ID changes

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    {article.source?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{article.source}</h3>
                        <span className="text-sm text-gray-500">#{article.category}</span>
                    </div>
                    <p className="text-sm text-gray-500">{new Date(article.published_at).toLocaleDateString()}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => { 
                            if(liked) return;
                            onLike(article); 
                            setLiked(true); 
                            setLikesCount(likesCount + 1); 
                            if(disliked){
                                setDisliked(false);
                                setDislikesCount(dislikesCount - 1);
                            }
                        }}
                        className={`flex items-center space-x-2 ${liked ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                    >
                        <ThumbsUp className="h-5 w-5" />
                        <span>{likesCount}</span>
                    </button>
                    <button
                        onClick={() => { 
                            if(disliked) return;
                            onDislike(article); 
                            setDisliked(true); 
                            setDislikesCount(dislikesCount + 1);
                            if(liked){
                                setLiked(false);
                                setLikesCount(likesCount - 1);
                            }
                        }}
                        className={`flex items-center space-x-2 ${disliked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                    >
                        <ThumbsDown className="h-5 w-5" />
                        <span>{dislikesCount}</span>
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button className={`text-gray-500 hover:text-gray-700 ${saved ? 'text-blue-500' : ''}`}>
                        <Bookmark className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <MessageSquare className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <Link2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
