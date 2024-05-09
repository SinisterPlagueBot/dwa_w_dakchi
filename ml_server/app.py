from flask import Flask, jsonify, request
import joblib
import numpy as np

app = Flask(__name__)

def preprocess(data, scaler):
    data_array = np.array([data])
    data_array = scaler.transform(data_array)
    return data_array

def load_model():
    model_path = "diabetes.joblib"
    scaler_path = "scaler.joblib"
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    return model, scaler

model, scaler = load_model()

@app.route("/predict", methods=["POST"])
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
    preprocessed_data = preprocess(values_list, scaler)
    prediction = int(model.predict(preprocessed_data)[0])  
    print(prediction)
    if prediction == 0 :
        return jsonify({"diabetes_prediction": "Pas diabétique"})
    return jsonify({"diabetes_prediction": "Diabétique"})


@app.route("/")
def hello():
    return jsonify({"message": "Welcome to the Diabetes Prediction API!"})

if __name__ == '__main__':
    app.run(debug=True)
