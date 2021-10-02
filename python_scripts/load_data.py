import pandas as pd
from json import dump

class LoadData:
    def __init__(self,path:str)->None:
        self.path = path
        self.load_df()
    
    def load_df(self)->None:
        self.df = pd.read_csv(self.path)

    def return_campaign_ids(self)->list:
        return self.df["CampaignId"].unique().tolist()

    def return_siteInfo_df(self,site_name:str)->pd.DataFrame:
        return self.df[self.df["Site"] == site_name]

    def return_siteInfo_json(self,site_name:str)->None:
        site_df = self.return_siteInfo_df(site_name)
        json_file_name = self.path.split("/")[0].split(".")[0]
        with open(json_file_name, "w", encoding='UTF-8') as export_file:
                dump(site_df, export_file, indent=4,
                     sort_keys=True, ensure_ascii=False)

    def return_specific_siteInfo(self,site_name:str,campaign_id:str):
        return self.df.query(f"Site == {site_name} and CampaignId == {campaign_id}")

    def return_specific_siteInfo_json(self, site_name:str,campaign_id:str):
        site_df = self.return_specific_siteInfo(site_name,campaign_id)
        pass
