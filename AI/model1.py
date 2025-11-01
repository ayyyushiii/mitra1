import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# Load dataset
df = pd.read_csv("chitfund_ai_dataset.csv")

# Remove rows with missing values
df = df.dropna()

# Feature columns
X = df[["daily_income", "daily_expense", "goal_type", "goal_amount", "profile_type"]]

# Target columns
y_months = df["months_to_reach_goal"]
y_daily = df["recommended_daily_saving"]

# Categorical & numerical columns
cat_cols = ["goal_type", "profile_type"]
num_cols = ["daily_income", "daily_expense", "goal_amount"]

# Pre-processing (OneHotEncoder for categories)
preprocess = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
        ("num", "passthrough", num_cols),
    ]
)

# -------- Model 1: Months to Goal --------#

model_months = Pipeline(
    steps=[
        ("preprocess", preprocess),
        ("rf", RandomForestRegressor(n_estimators=200, random_state=42)),
    ]
)

X_train, X_test, y_train, y_test = train_test_split(X, y_months, test_size=0.2, random_state=42)

model_months.fit(X_train, y_train)
pred_months = model_months.predict(X_test)
error_months = mean_absolute_error(y_test, pred_months)
print(f"MAE - Months to reach goal: {round(error_months,2)} months")

joblib.dump(model_months, "model_months.pkl")

# -------- Model 2: Recommended Daily Savings --------#

model_daily = Pipeline(
    steps=[
        ("preprocess", preprocess),
        ("rf", RandomForestRegressor(n_estimators=200, random_state=42)),
    ]
)

X_train2, X_test2, y_train2, y_test2 = train_test_split(X, y_daily, test_size=0.2, random_state=42)

model_daily.fit(X_train2, y_train2)
pred_daily = model_daily.predict(X_test2)
error_daily = mean_absolute_error(y_test2, pred_daily)
print(f"MAE - Recommended daily saving: ₹{round(error_daily,2)}")

joblib.dump(model_daily, "model_daily.pkl")

print("Training completed. Models saved.")
