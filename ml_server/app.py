from flask import Flask, jsonify, request
import joblib
import numpy as np

app = Flask(__name__)

def preprocess_diabetes(data, scaler):
    data_array = np.array([data])
    data_array = scaler.transform(data_array)
    return data_array

def preprocess_covid(data, scaler):
    data_array = np.array([data])
    data_array = scaler.transform(data_array)
    return data_array

def load_model_diabetes():
    model_path = "diabetes.joblib"
    scaler_path = "scaler.joblib"
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    return model, scaler

def load_model_covid():
    model_path = "covid_model.joblib"
    def preprocess_covid(data):
        data = np.array(data)
        data=np.where(data=='Yes',1,0)
        return data.reshape(1,-1)
        
    model = joblib.load(model_path)
    return model,preprocess_covid
model_diabetes, scaler = load_model_diabetes()
model_covid,preprocess_covid=load_model_covid()
@app.route("/predict_diabetes", methods=["POST"])
def predict_diabetes():
    data = request.json
    print(data)
    if data is None:
        return jsonify({"error": "No JSON data provided"}), 400

    expected_keys = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]
    missing_keys = [key for key in expected_keys if key not in data]
    if missing_keys:
        return jsonify({"error": f"Missing keys: {', '.join(missing_keys)}"}), 400

    values_list = [data[key] for key in expected_keys]
    preprocessed_data = preprocess_diabetes(values_list, scaler)
    prediction = int(model_diabetes.predict(preprocessed_data)[0])  
    print(prediction)
    if prediction == 0 :
        return jsonify({"diabetes_prediction": "Pas diabétique"})
    return jsonify({"diabetes_prediction": "Diabétique"})

@app.route("/predict_covid", methods=["POST"])
def predict_covid():
    data = request.json
    print(data)
    if data is None:
        return jsonify({"error": "No JSON data provided"}), 400

    expected_keys = [
    "Breathing Problem", "Fever", "Dry Cough", "Sore throat",  
    "Hyper Tension", "Abroad travel", 
    "Contact with COVID Patient", "Attended Large Gathering", 
    "Visited Public Exposed Places", "Family working in Public Exposed Places"
    
]
    missing_keys = [key for key in expected_keys if key not in data]
    if missing_keys:
        return jsonify({"error": f"Missing keys: {', '.join(missing_keys)}"}), 400

    values_list = [data[key] for key in expected_keys]
    preprocessed_data = preprocess_covid(values_list)
    prediction = int(model_covid.predict(preprocessed_data))  
    print(prediction)
    if prediction == 0 :
        return jsonify({"covid_prediction": "no covid"})
    return jsonify({"covid_prediction": "covid detected"})


@app.route("/")
def hello():
    return jsonify({"message": "Welcome to the Diabetes Prediction API!"})

if __name__ == '__main__':
    app.run(debug=True)
