import React, { Component, useEffect ,useState} from 'react';

export const CampaignSelect = ( campaign_id_list ) => {
    const prepare_options =  function (){
            const options = []
              for (let i = 1; i <= campaign_id_list.length; i++) {
                options.push(<option key={campaign_id_list[i]} value={campaign_id_list[i]}>{campaign_id_list[i]}</option>);      
              }
              return options; 
            }
    return(
        <div Name="campaign_select">
        <h2> Welcome User!! Please select the campaign ID to get information about top sites with high engagement scores </h2>
        <div Name="dropbox_area">
        <select name ="SelectCaptionId" id ="SelectCaptionId" >
       {prepare_options()}
        </select>
        </div>
        </div>
    )
};

export default CampaignSelect;