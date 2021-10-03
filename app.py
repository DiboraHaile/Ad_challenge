
from flask import Flask
import os
import sys
# sys.path.append(os.path.abspath(os.path.join('../')))
from python_scripts.load_data import LoadData
from python_scripts.score_campaign import ScoreCampaign
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ld = LoadData("data/impression_log.csv")
top_sites = []

@app.route('/')
def index():
    site = ld.return_campaign_ids()
    return {"ids":site}

@app.route('/<int:postID>')
def return_site_info(postID):
    global top_sites
    top_sites,top_sites["Site"] = ScoreCampaign("data/impression_log.csv").Score_sites(postID)
    # top_site_info = ld.return_siteInfo_df(top_sites)
    return postID
    
@app.route('/site_info')
def pass_site_info():
    return {"site":top_sites}

    

if __name__ == "__main__":
    app.run(host = "0.0.0.0",debug=True)

