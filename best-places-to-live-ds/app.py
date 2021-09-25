from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
import matplotlib.pyplot as plt
import pandas as pd
import requests
import numpy as np
import json
import io
df1 = pd.read_csv('ranked_df.csv')
df2 = pd.read_csv('non_norm_df.csv')

def rankify(df, factors, top=20, quant=.60):
    df_copy = df
    
    for i in factors:
        df_copy = df_copy[df[i] > df_copy[i].quantile(quant)]
    
    df_copy['score'] = df_copy[factors].mean(axis=1)
    df_copy = df_copy.sort_values('score', ascending=False)

    # initialize columns to be masked
    columns = [
               'name', 
               'population', 
               'secure_url', # This is a photo url, should change the name...  
               'id',
               '_id',
               'short_name',
               'state',

               ]

    # truncate the dataframe column-wise to the ones in 'columns'
    df2 = df_copy[columns]

    return df2.to_dict(orient='record')

def best_worst_city(df, factors):
    final_dict = []
    for factor in factors:
        avg = df[factor].mean()
    
        df1 = df.loc[df[factor] == df[factor].max(), [factor,'name','_id']]
        max_score = df1[factor].values[0]
        max_score_city = df1['name'].values[0]
        max_score_id = df1['_id'].values[0]
    
        df2 = df.loc[df[factor] == df[factor].min(), [factor,'name','_id']]
        min_score = df2[factor].values[0]
        min_score_city = df2['name'].values[0]
        min_score_id = df2['_id'].values[0]
    
        dict1 = {
            factor: 
            {
                'bestCityFactorScore': max_score,
                'bestCityName':max_score_city,
                'bestCityID': max_score_id,
                'worstCityFactorScore': min_score, 
                'worstCityName': min_score_city,
                'worstCityID': min_score_id,
                'averageFactorScore': avg
            }
        }
        final_dict.append(dict1)
    return final_dict


def radar_plt(df, city, factors):
    df_copy = df
    df_copy = df_copy.loc[df_copy['_id'] == city]
    
    df_copy = df_copy[factors]
    test = df_copy.T.reset_index()

    test.columns = ['theta', 'r']
    test['r'] = test['r']*100
    test['theta'] = test['theta'].replace('_', ' ', regex=True
                                ).replace('score ', '', regex=True
                                ).replace('ranked ', '',regex=True).str.title()

    plt.style.use("bmh")
    fig = plt.figure(figsize=(10,10))
    ax = fig.add_subplot(111,polar=True)
    ax.spines['polar'].set_visible(False)

    rank = test['r']
    N = test['r'].shape[0]
    colors = plt.cm.GnBu(test['r'] / 150)
    width = np.pi / N*1.8
    theta = np.arange(0, 2*np.pi, 2*np.pi/N) 
    bars = ax.bar(theta, rank, width=width, color=colors, alpha=0.9)

    ax.set_xticks(theta)
    ax.set_xticklabels(test['theta'], fontweight='bold', fontsize=12)

    y_label_text = ["{}%".format(int(loc)) for loc in plt.yticks()[0]]
    ax.set_yticklabels(y_label_text)
    ax.yaxis.grid(True)
    
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)

    return bytes_image

def get_normalized_scores(df, id, factors):
    df1 = df.loc[df['_id'] == id]
    df2 = df1[factors]
    return df2.to_dict(orient='record')

city_factors = {
    "input1": ['score_business_freedom', 'cost-fitness-club', 'weather-sunshine-amount',
     'score_housing', 'score_internet_access', 'score_leisure_&_culture'],
     "input2": "5dc9f97b2a65b6af0202599f"
}
city_data = {
    "input1": ["avg_commute_time"]
}
factor_normal = {
    #"id": "5dc9f97b2a65b6af0202599f",
    "factors": ['score_startups', 'score_safety']
}

# Initialize Flask app
app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['POST', 'GET'])
def city():
    
    # retrieve json user input data
    data = request.get_json(force=True)

    # Extract factors from JSON and put them in a list
    jd = json.dumps(data, ensure_ascii=False)
    data_array = json.loads(jd)
    factors = (data_array['input1'])
    #print(factors)

    # Call the rankify function to return top 10 cities
    cities = rankify(df1, factors)
 
    return jsonify(cities)


@app.route('/visual', methods=['POST', 'GET'])
def visuals():
    data1 = request.get_json(force=True)

    jd1 = json.dumps(data1, ensure_ascii=False)
    data_array1 = json.loads(jd1)
    factors = (data_array1['input1'])
    city = (data_array1['input2'])

    visual = radar_plt(df1, city, factors)

    return send_file(visual,
                     attachment_filename='plot.png',
                     mimetype='image/png')

@app.route('/compare', methods=['POST', 'GET'])
def city_retrieval():
    
    # retrieve json user input data
    data = request.get_json(force=True)

    # Extract factors from JSON and put them in a list
    jd = json.dumps(data, ensure_ascii=False)
    data_array = json.loads(jd)
    factors = (data_array['factors'])
    #print(factors)

    # Call the rankify function to return top 10 cities
    factor_cities = best_worst_city(df2, factors)
 
    return jsonify(factor_cities)

@app.route('/normalized', methods=['POST', 'GET'])
def score_retrieval():
    
    # retrieve json user input data
    data = request.get_json(force=True)

    # Extract factors from JSON and put them in a list
    jd = json.dumps(data, ensure_ascii=False)
    data_array = json.loads(jd)
    city_id = (data_array['id'])
    factors = (data_array['factors'])
    #print(factors)

    # Call the rankify function to return top 10 cities
    factor_scores = get_normalized_scores(df1, city_id, factors)
 
    return jsonify(factor_scores)

@app.route('/', methods=['POST', 'GET'])
def responses():
    response = requests.get(
        'https://raw.githubusercontent.com/labs15-best-places/backend/master/data-seeding/1-cities/data.js')
    
    return str(response.text)



if __name__ == "__main__":
    app.run(debug=True)