from flask import Flask, render_template, request
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(name)

@app.route('/')
def index():
    return render_template('predict.js')

model = pickle.load(open('model_lr.pkl', 'rb'))

standard_scaler = StandardScaler()

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # Get input parameters from the request
        Conductivity = float(request.form['Conductivity'])
        NO3 = float(request.form['NO3'])
        Temp = float(request.form['Temp'])
        Turbidity = float(request.form['Turbidity'])
        
        # Scale the input features
        scaled_features = standard_scaler.transform([[Conductivity, NO3, Temp, Turbidity]])
        
        # Make prediction using the model
        prediction = model.predict(scaled_features)
        
        # Return prediction to the template
        return render_template('predict.js', prediction=prediction)
    else:
        return render_template('predict.js')

if name == "main":
    app.run(debug=True)