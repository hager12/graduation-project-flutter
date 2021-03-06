# -*- coding: utf-8 -*-
"""task+python.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Whp8PTRPZwvm2TbxfDlR6UKNtRT-3Kaw
"""

from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
import re
from nltk.tokenize import TweetTokenizer
import string
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import sklearn.linear_model as SK
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import numpy as np
import nltk
from nltk.corpus import twitter_samples
nltk.download('twitter_samples')
nltk.download('stopwords')

positive_tweets = twitter_samples.strings('positive_tweets.json')
negative_tweets = twitter_samples.strings('negative_tweets.json')
X = positive_tweets + negative_tweets
Y = np.append(np.ones((len(positive_tweets), 1)),
              np.zeros((len(negative_tweets), 1)), axis=0)
print(len(X), len(Y))


def visualize(all_positive_tweets, all_negative_tweets):
    # Declare a figure with a custom size
    fig = plt.figure(figsize=(5, 5))

    # labels for the two classes
    labels = 'Positives', 'Negative'

    # Sizes for each slide
    sizes = [len(all_positive_tweets), len(all_negative_tweets)]

    # Declare pie chart, where the slices will be ordered and plotted counter-clockwise:
    plt.pie(sizes, labels=labels, autopct='%1.1f%%',
            shadow=True, startangle=45)

    plt.axis('equal')

    # Display the chart
    plt.show()


visualize(positive_tweets, negative_tweets)


tokenizer = TweetTokenizer(
    preserve_case=False, strip_handles=True, reduce_len=True)
stopwords_english = stopwords.words('english')
stemmer = PorterStemmer()


def text_process(tweet):
    tweet = re.sub(r'^RT[\s]+', '', tweet)
    tweet = re.sub(r'((https?:\/\/.*[\r\n]*)|(www\.[^\s]+))', '', tweet)
    tweet = re.sub(r'#[^\s]+', '', tweet)
    tweet = re.sub(r'@[^\s]+', '', tweet)
    tweet = re.sub(r'<.*?>', '', tweet)
    tweet = re.sub(r'<</?w*?>>', '', tweet)
    tweet = re.sub(r'[0-9]', '', tweet)
    tweet = re.sub(r'^RT[\s]+', '', tweet)
    tweet = re.sub('[^A-Za-z0-9 ]+', '', tweet)
    tweet_tokenized = tokenizer.tokenize(tweet)

    tweet_processsed = [word for word in tweet_tokenized
                        if word not in stopwords_english and word not in
                        string.punctuation]
    tweet_after_stem = []
    for word in tweet_processsed:
        word = stemmer.stem(word)
        tweet_after_stem.append(word)
    return tweet_after_stem


X[20], text_process(X[20])


def build_freq(tweets, ys):
    yslist = np.squeeze(ys).tolist()
    frequency = {}
    for y, tweet in zip(yslist, tweets):
        for word in text_process(tweet):
            pair = (word, y)
            frequency[pair] = frequency.get(pair, 0) + 1
    return frequency


freqs = build_freq(X, Y)


def extract_features(tweet, freqs):
    word_list = text_process(tweet)
    x = np.zeros((1, 3))
    x[0, 0] = 1

    for word in word_list:
        x[0, 1] += freqs.get((word, 1.0), 0)
        x[0, 2] += freqs.get((word, 0.0), 0)

    return x


train_x, test_x, train_y, test_y = train_test_split(X, Y, test_size=0.2)

X_train = np.zeros(((len(train_x)), 3))
for i in range(len(train_x)):
    X_train[i, :] = extract_features(train_x[i], freqs)

y_train = np.array(train_y)

# Create Logistic Regression object
model = LogisticRegression()

# Train the model
model.fit(X_train, y_train)

# Extract features of the test set
X_test = np.zeros(((len(test_x)), 3))
for i in range(len(test_x)):
    X_test[i, :] = extract_features(test_x[i], freqs)

y_test = np.array(test_y)
accuracy = model.score(X_test, y_test)
print("accuracy: " + str(accuracy))


def binary_reverse(val):
    if val == 1:
        val = 0
    elif val == 0:
        val = 1
    return val

def valid(predict, tweet):

    c = "not"
    if (c in tweet):
        return int(binary_reverse(predict))
    else:
        return predict


//tweet = input("Enter your tweet: ")//
tweet_final = extract_features(tweet, freqs)
predict = model.predict(tweet_final)
resualt = int(valid(predict, tweet))

if resualt == 1:
    print("Positive sentiment")
else:
    print("Negative sentiment")
