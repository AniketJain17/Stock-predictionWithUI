import pandas as pd
import matplotlib.pyplot as plt
import random

import numpy as np
from tabulate import tabulate
from flask import Flask,  jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Your existing Python script (put your script content here)
# ...

# Assuming your script generates the `data` variable as shown in your original script
models = ['Simple LSTM', 'Bi-LSTM', 'Simple GRU', 'Bi-GRU', 'GRU-LSTM', 'LSTM-GRU-Bi-LSTM',
          'Stacked LSTM', 'CNN-Bi-LSTM', 'EEMD-Ensemble CNN', 'EEMD-Ensemble-CNN(Large)']
MSE = [0.0004072232445763366, 0.0005000506139239725, 0.00022834628914830254, 0.0012235577912200863, 0.0009060262745021321,
       0.002075882273433005, 0.0009451684151423362, 0.0009223105824260224, 0.00019808381330221891, 0.0001667082]
MAE = [0.016059828137190243, 0.018079012228853664, 0.011964837421536265, 0.030203257378998514, 0.02426845818742699,
       0.03896816927287234, 0.025767192679360194, 0.025158315670018652, 0.009464983828365803, 0.0092958861]
sMAPE = [0.018891302600025413, 0.021166436757949537, 0.01407366311680603, 0.03577723942453357, 0.02837164567556185,
         0.045901362491680725, 0.030379938861843116, 0.029672016395640002, 0.008302686735987663, 0.0080958734]
R2_score = [0.8910212191905597, 0.8521526418563456, 0.9403095873293223, 0.6696787248501639, 0.6285710529142268,
            0.2031777307201621, 0.7169999934312372, 0.7258388456358698, 0.9876543208956718, 0.9900237588]

# Combine the data into a list of lists
data = [models, MSE, MAE, sMAPE, R2_score]

# Transpose the data so that each model's metrics are in a row
data = list(map(list, zip(*data)))


def eemd(x, num_sifts, num_modes):
    def sift(x):
        # Sifting process
        mean = np.mean(x)
        upper_env = []
        lower_env = []
        imf = np.zeros(len(x))

        for _ in range(num_sifts):
            upper = []
            lower = []
            h = x - mean

            for i in range(1, len(x) - 1):
                if (h[i] > 0 and h[i] > h[i - 1] and h[i] > h[i + 1]) or (
                        h[i] < 0 and h[i] < h[i - 1] and h[i] < h[i + 1]):
                    upper.append(i)
                elif (h[i] > 0 and h[i] < h[i - 1] and h[i] < h[i + 1]) or (
                        h[i] < 0 and h[i] > h[i - 1] and h[i] > h[i + 1]):
                    lower.append(i)

            if len(upper) < 3 or len(lower) < 3:
                break

            upper_env.extend(upper)
            lower_env.extend(lower)
            mean = np.mean(x[upper + lower])

        if len(upper_env) > 0 and len(lower_env) > 0:
            upper_env = np.array(upper_env)
            lower_env = np.array(lower_env)
            interp_upper = np.interp(range(len(x)), upper_env, x[upper_env])
            interp_lower = np.interp(range(len(x)), lower_env, x[lower_env])
            imf = (interp_upper + interp_lower) / 2

        return imf

    imfs = []
    residual = x.copy()

    for _ in range(num_modes):
        imf = sift(residual)
        imfs.append(imf)
        residual -= imf

    imfs.append(residual)

    return imfs


# Load the stock data from the CSV file
EEMD_Data = pd.read_csv("final_data_adj.csv")
Volume_data = EEMD_Data[['Date', 'Volume']]
Volume_data_json = Volume_data.to_json(orient='records')


chart_data = EEMD_Data[['Date', 'Low', 'Open', 'Close', 'High']]

# Convert data to JSON
chart_data_json = chart_data.to_json(orient='records')


# Perform EEMD_Data preprocessing
# Convert the 'Date' column to datetime format
EEMD_Data['Date'] = pd.to_datetime(EEMD_Data['Date'])
EEMD_Data.set_index('Date', inplace=True)  # Set the 'Date' column as the index
EEMD_Data = EEMD_Data[['RSI']]  # Select the 'RSI' column as the input for EEMD
# similarly select Closs and Sadj for corresponding IMF calculations
# Normalize the EEMD_Data
normalized_EEMD_Data = (EEMD_Data - EEMD_Data.mean()) / EEMD_Data.std()

# Extract the closing prices
closing_prices = normalized_EEMD_Data['RSI'].values
# similarly select Close and Sadj for corresponding IMF calculations
# Perform EEMD decomposition
num_sifts = 500
num_modes = 0

imfs = eemd(closing_prices, num_sifts, num_modes)


# Define API endpoint
@app.route('/api/chartstickdata', methods=['GET'])
def get_chart_data():
    start = int(request.args.get('start', 0))
    end = int(request.args.get('end', len(chart_data)))

    filtered_data = chart_data[start:end].to_json(orient='records')

    return jsonify({'chart_data': filtered_data})


@app.route('/api/eemd_data', methods=['GET'])
def get_eemd_data():
    imfs_as_lists = [imf.tolist() for imf in imfs]
    eemd_results = {'imfs': imfs_as_lists}
    return jsonify(eemd_results)


@app.route('/api/Volume', methods=['GET'])
def get_volume_data():
    start = int(request.args.get('start', 0))
    end = int(request.args.get('end', len(Volume_data)))

    filtered_data = Volume_data[start:end].to_json(orient='records')
    
    return jsonify({'volume_data': filtered_data})

@app.route('/api/get_metrics_data', methods=['GET'])
def get_metrics_data():
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
