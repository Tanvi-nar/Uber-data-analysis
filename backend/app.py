from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    dataset = pd.read_csv(file)

    # === Preprocessing ===
    dataset['PURPOSE'] = dataset['PURPOSE'].fillna('NOT')
    dataset['START_DATE'] = pd.to_datetime(dataset['START_DATE'], errors='coerce')
    dataset['END_DATE'] = pd.to_datetime(dataset['END_DATE'], errors='coerce')
    dataset.dropna(inplace=True)

    # === Feature Engineering ===
    dataset['date'] = pd.to_datetime(dataset['START_DATE']).dt.date
    dataset['time'] = pd.to_datetime(dataset['START_DATE']).dt.hour

    # Day-Night Classification
    dataset['day-night'] = pd.cut(x=dataset['time'],
                                  bins=[0, 10, 15, 19, 24],
                                  labels=['Morning', 'Afternoon', 'Evening', 'Night'],
                                  right=False)

    # Day of Week
    dataset['DAY'] = dataset['START_DATE'].dt.weekday
    day_label = {0: 'Mon', 1: 'Tues', 2: 'Wed', 3: 'Thur', 4: 'Fri', 5: 'Sat', 6: 'Sun'}
    dataset['DAY'] = dataset['DAY'].map(day_label)

    # Month Conversion
    dataset["MONTH"] = pd.DatetimeIndex(dataset['START_DATE']).month
    month_label = {
        1.0: 'Jan', 2.0: 'Feb', 3.0: 'Mar', 4.0: 'Apr',
        5.0: 'May', 6.0: 'Jun', 7.0: 'Jul', 8.0: 'Aug',
        9.0: 'Sep', 10.0: 'Oct', 11.0: 'Nov', 12.0: 'Dec'
    }
    dataset["MONTH"] = dataset["MONTH"].map(month_label)

    # === Aggregations for Charts ===
    return jsonify({
        'shape': dataset.shape,
        'category_counts': dataset['CATEGORY'].value_counts().to_dict(),
        'purpose_counts': dataset['PURPOSE'].value_counts().to_dict(),
        'day_night_counts': dataset['day-night'].value_counts().to_dict(),
        'day_counts': dataset['DAY'].value_counts().to_dict(),
        'monthly_trip_counts': dataset['MONTH'].value_counts(sort=False).to_dict(),
        'monthly_max_miles': dataset.groupby('MONTH', sort=False)['MILES'].max().to_dict(),
    })

if __name__ == '__main__':
    app.run(debug=True)



