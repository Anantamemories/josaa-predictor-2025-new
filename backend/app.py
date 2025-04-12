from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

df = pd.read_excel("Merged_JoSAA_with_Fees2.xlsx")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    rank = int(data['rank'])
    category = data['category']
    gender = data['gender']
    home_state = data['home_state']
    round_no = int(data['round'])

    filtered_df = df[
        (df['Seat Type'] == category) &
        (df['Gender'] == gender) &
        (df['Home State'] == home_state) &
        (df['Round'] == round_no) &
        (df['Closing Rank'] >= rank)
    ]

    results = filtered_df.sort_values(by='Closing Rank').head(30)[[
        'Institute', 'Academic Program Name', 'Closing Rank',
        'Total Fees (4 years)', 'Avg Fees/Year',
        'Average Package', 'Highest Package'
    ]]

    return jsonify(results.to_dict(orient='records'))

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
