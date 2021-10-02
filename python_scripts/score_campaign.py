import pandas as pd

class ScoreCampaign:
    def __init__(self,path:str):
        self.path = path
        self.load_df()

    def load_df(self)-> None:
        """ Returns pandas dataframe from a specified csv file"""
        self.df = pd.read_csv(self.path)

    def return_engagement_count(self)-> pd.DataFrame:
        """ Counts the engagement on each site for each campaign"""
        engagement = self.df.groupby(["CampaignId","Site"]).apply(lambda row: row["engagement"].sum())
        campaign_ids = [key[0] for key in engagement.keys()]
        sites = [key[1] for key in engagement.keys()]
        return pd.DataFrame({"engagement_count":engagement,"Campaign_id":campaign_ids,"site":sites})


    def return_impressions_df(self)-> pd.DataFrame:
        """ Counts the number of rows that contains each site """
        row_count_sites = self.df.groupby(["Site"]).count()["CampaignId"]
        return pd.DataFrame({"Count_site_apperances":row_count_sites,"site":row_count_sites.keys()})
        
    def return_engagement_rate_df(self)-> pd.DataFrame:
        """ Counts engagement for each campaign for each site"""
        engagement_count_df = self.return_engagement_count()
        total_number_rows = self.return_impressions_df()
        engagement_rate_df = engagement_count_df.merge(total_number_rows, left_on='site', right_on='site')
        engagement_rate_df["engagement_rate"] = engagement_rate_df.apply(lambda row: row["engagement_count"]/row["Count_site_apperances"],axis=1)
        return engagement_rate_df
    
    def score_sites(self,campaign_id:str)-> pd.DataFrame:
        """ Accepts a campain_id filters the data with
            the campaignId and return top 10 sites based 
            on scores"""
        engagement_rate_df = self.return_engagement_rate_df()
        top_sites = engagement_rate_df[engagement_rate_df["Campaign_id"] == campaign_id].sort_values(by = "engagement_rate", ascending=True).reset_index().head(10)
        return top_sites,top_sites["Site"]



    


