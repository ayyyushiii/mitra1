import pandas as pd
import numpy as np
import random

# Define possible goal types and typical costs
goals = {
    "Marriage": (200000, 800000),
    "Bike": (50000, 150000),
    "House Downpayment": (500000, 2000000),
    "Gold": (40000, 300000),
    "Emergency Fund": (20000, 150000),
    "Education": (100000, 500000)
}

num_records = 5000  # dataset size

data = []

for _ in range(num_records):
    # Income & expense ranges for rural/urban/student
    daily_income = np.random.choice([
        np.random.randint(300, 600),   # rural labor/student small budget
        np.random.randint(600, 1500),  # mid-income
        np.random.randint(1500, 3000)  # higher range
    ])

    daily_expense = np.random.randint(100, int(daily_income * 0.9))
    
    goal = random.choice(list(goals.keys()))
    goal_amount = np.random.randint(goals[goal][0], goals[goal][1])
    
    # Net savings estimations
    monthly_income = daily_income * 30
    monthly_expense = daily_expense * 30
    monthly_savings = max(monthly_income - monthly_expense, 0)
    
    if monthly_savings == 0:
        time_months = None
        recommended_daily_save = None
    else:
        time_months = round(goal_amount / monthly_savings, 2)
        recommended_daily_save = round((monthly_savings / 30) * 0.4, 2)

    # Add randomness so model learns variance
    if recommended_daily_save:
        recommended_daily_save *= np.random.uniform(0.8, 1.2)
        time_months *= np.random.uniform(0.9, 1.1)

    data.append([
        daily_income,
        daily_expense,
        goal,
        goal_amount,
        round(monthly_savings / 30, 2),   # avg daily saving capacity
        None if not recommended_daily_save else round(recommended_daily_save, 2),
        None if not time_months else round(time_months, 2),
        random.choice(["student", "rural", "urban"]),
    ])

df = pd.DataFrame(data, columns=[
    "daily_income",
    "daily_expense",
    "goal_type",
    "goal_amount",
    "daily_saving_capacity",
    "recommended_daily_saving",
    "months_to_reach_goal",
    "profile_type"
])

df.to_csv("chitfund_ai_dataset.csv", index=False)

print("✅ Dataset generated: chitfund_ai_dataset.csv")
print(df.head())
