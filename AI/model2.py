import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import joblib

df = pd.read_csv("ai_finance_dataset_v2.csv").dropna()

features = ["daily_income","daily_expense","goal_type","goal_amount","profile_type","income_stability"]

X = df[features]
y_months = df["months_to_reach_goal"]
y_save = df["recommended_daily_saving"]
y_score = df["discipline_score"]

cat = ["goal_type","profile_type"]
num = ["daily_income","daily_expense","goal_amount","income_stability"]

pre = ColumnTransformer([
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat),
    ("num", "passthrough", num),
])

def train_and_dump(X, y, name):
    model = Pipeline([
        ("preprocess", pre),
        ("gb", GradientBoostingRegressor()),
    ])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    print(f"{name} MAE:", round(mean_absolute_error(y_test, pred), 2))
    joblib.dump(model, f"{name}.pkl")

train_and_dump(X, y_months, "model_months_v2")
train_and_dump(X, y_save, "model_savings_v2")
train_and_dump(X, y_score, "model_discipline_v2")

print("✅ All v2 models trained & saved")
