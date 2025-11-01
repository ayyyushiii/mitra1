import pandas as pd
import numpy as np
import random

goals = {
    "Marriage": (200000, 800000),
    "Bike": (50000, 150000),
    "House Downpayment": (500000, 2000000),
    "Gold": (40000, 300000),
    "Emergency Fund": (20000, 150000),
    "Education": (100000, 500000)
}

profile_types = ["student", "rural", "urban"]

spending_categories = ["food", "travel", "shopping", "rent", "utilities", "entertainment"]

num = 6000
data = []

for _ in range(num):

    profile = random.choice(profile_types)

    if profile == "rural":
        daily_income = np.random.randint(300, 800)
    elif profile == "student":
        daily_income = np.random.randint(100, 500)
    else:
        daily_income = np.random.randint(800, 3000)
    
    # income fluctuation
    income_stability = round(np.random.uniform(0.6, 1.0), 2)
    daily_income = round(daily_income * income_stability, 2)

    goal = random.choice(list(goals.keys()))
    goal_amount = np.random.randint(goals[goal][0], goals[goal][1])

    category_spend = {c: np.random.randint(5, 40) for c in spending_categories}
    total_daily_expense = sum(category_spend.values())

    net_daily_save = max(daily_income - total_daily_expense, 0)

    if net_daily_save > 0:
        months = goal_amount / (net_daily_save * 30)
        recommended_save = net_daily_save * 0.4
    else:
        months = None
        recommended_save = None

    # Discipline score (0–100)
    discipline = int(
        np.clip(
            (net_daily_save / max(daily_income, 1)) * 120 * income_stability,
            5, 100
        )
    )

    row = {
        "daily_income": daily_income,
        "income_stability": income_stability,
        "goal_type": goal,
        "goal_amount": goal_amount,
        "daily_expense": total_daily_expense,
        "profile_type": profile,
        "months_to_reach_goal": None if not months else round(months, 2),
        "recommended_daily_saving": None if not recommended_save else round(recommended_save, 2),
        "discipline_score": discipline
    }

    data.append(row)

df = pd.DataFrame(data)
df.to_csv("ai_finance_dataset_v2.csv", index=False)
print("✅ Dataset v2 generated!")
print(df.head())
