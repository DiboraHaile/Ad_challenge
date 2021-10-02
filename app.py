
from flask import Flask
import os
import sys
# sys.path.append(os.path.abspath(os.path.join('../')))
from python_scripts.load_data import LoadData
from python_scripts.score_campaign import ScoreCampaign
from flask import request

app = Flask(__name__)
ld = LoadData("data/impression_log.csv")
top_sites = {}

@app.route('/')
def index():
    site = ld.return_campaign_ids()
    return {"ids":site,"top_sites":top_sites}

@app.route('/campaign_id',methods=['POST'])
def return_site_info():
    global top_sites
    top_sites["sites"] = request.json
    # top_sites,top_sites["Site"] = ScoreCampaign("data/impression_log.csv").Score_sites(request.text)
    



