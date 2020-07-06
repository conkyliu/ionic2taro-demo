import SWebView from '../components/LTGWebView';

import React, {  } from 'react';
import { RouteComponentProps } from 'react-router';
import SpPageContainer from './SpPageContainer';

interface UserDetailPageProps extends RouteComponentProps<{
    url?: string;
}>{}

const LTGWebViewSample : React.FC<UserDetailPageProps>=(pageMatch)=>{

    return(

        <SpPageContainer title="SWebView">
              <SWebView url={pageMatch.match.params.url ?? "http://www.lightestsport.com"}></SWebView>
        </SpPageContainer>
        
    );
    
}

export default LTGWebViewSample;