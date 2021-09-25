from flask import Flask, abort, jsonify, request
import pickle
import pandas

my_prediction = pickle.load(open("New York-Newark-Jersey City.pkl", "rb"))

app = Flask(__name__)

@app.route('/')
def default():
   return '<h1>Homepage</h1>'

@app.route('/api/', methods=['POST'])
def predict():
    input = request.get_json(force=True)
    city=input['city']
    date=input['date']
    return jsonify(cpi=my_prediction[(my_prediction['date'] == date) & (my_prediction['city'] == city)]['mean_change'].to_string()[5:])

@app.route('/api/<date>', methods=['GET'])
def make_predict(date):
    change = my_prediction[my_prediction['date'] == date]['mean_change'].to_string()[5:]
    #return '<h1>Percent change {}{}</h1>'.format(round(float(change.strip(' "')),2),'%')
    return jsonify(cpi=my_prediction[my_prediction['date'] == date]['mean_change'].to_string()[5:])

if __name__ == '__main__':
    app.run(host='0.0.0.0')
