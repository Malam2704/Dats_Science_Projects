import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

df = pd.read_csv('election2016.csv')
df['VEP Turnout Rate (Total Ballots Counted)'] = df['VEP Turnout Rate (Total Ballots Counted)'].str.rstrip('%').astype('float')

# Create base map
fig = px.choropleth(
    df,
    locations='State Abv',
    locationmode="USA-states",
    color='VEP Turnout Rate (Total Ballots Counted)',
    scope="usa",
    color_continuous_scale="Blues",
    labels={'VEP Turnout Rate (Total Ballots Counted)': 'Turnout Rate (%)'}
)

# Add labels using scattergeo
fig.add_scattergeo(
    locations=df['State Abv'],
    locationmode="USA-states",
    text=df['VEP Turnout Rate (Total Ballots Counted)'].round(1).astype(str) + '%',
    mode='text',
    textfont=dict(
        family="Arial",
        size=[6 if x in ['DE','DC', 'MD', 'RI','VT','NH'] else 14 for x in df['State Abv']],
        color=["black" if x < 65 else "white" for x in df['VEP Turnout Rate (Total Ballots Counted)']]
    )
)

# Add side annotations for small states
annotations = []
small_states = ['DE', 'DC', 'MD', 'RI', 'VT', 'NH']

for idx, state in enumerate(small_states):
    state_data = df[df['State Abv'] == state]
    if not state_data.empty:
       turnout = state_data['VEP Turnout Rate (Total Ballots Counted)'].iloc[0]
       annotations.append(dict(
           x=0.85,  # Move left
           y=0.6 - (idx * 0.05),  # Reduce spacing between items
           xref='paper',
           yref='paper',
           text=f"{state}: {turnout:.1f}%",
           showarrow=False,
           font=dict(size=12)
       ))

fig.update_layout(
    title="2020 Voter Turnout by State",
    title_x=0.5,
    geo_scope='usa',
    width=1400,  # Increased width
    height=800,
    margin=dict(r=150),
    coloraxis_colorbar=dict(x=1.1) , # Move colorbar right
    annotations=annotations,
    geo=dict(
        projection_scale=1.0,
        center=dict(lat=39.5, lon=-98.35),
        lonaxis_range=[-125, -65]  # Adjust map width
    )
)

fig.show()
fig.write_image("voter_turnout_map.png")  # scale=2 for higher resolution

# If you get an error, first install:
# pip install -U kaleido