print("hello")
import numpy as np
import re
import string
from nltk.stem import PorterStemmer
from nltk.tokenize import TweetTokenizer
import pickle
import sys
tokenizer = TweetTokenizer(preserve_case=False, strip_handles=True, reduce_len=True)
stemmer = PorterStemmer()
stop = open("python/stopwords.txt", "rb")
stopwords_english = pickle.load(stop)
dect = open("python/data.pkl", "rb")
freqs = pickle. load(dect)

with open("python/weights_LR_Model.pkl", 'rb') as file:
    Pickled_LR_Model = pickle.load(file)



def review_comments(text):
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

    def extract_features(tweet, freqs):
        word_list = text_process(tweet)
        x = np.zeros((1, 3))
        x[0, 0] = 1
        for word in word_list:
            x[0, 1] += freqs.get((word, 1.0), 0)
            x[0, 2] += freqs.get((word, 0.0), 0)
        return x

    def valid(predict, tweet):
        c = "not"
        if (c in tweet and predict == 0):
            return 1
        elif(c in tweet and predict == 1):
            return 0
        else:
            return predict
    tweet_final = extract_features(text, freqs)
    predict = Pickled_LR_Model.predict(tweet_final)
    resualt = int(valid(predict, text))
    return(resualt)


c = review_comments(str(sys.argv[1]))
print(c)