import React from 'react';
import { render } from '@testing-library/react';
import LocalizedStrings from 'react-localization';


test('test a simple test',()=>{

    const sampleLangPackage ={
        'en':{
            "hi":"Hello",
            'how':"How are you?"
        },
        'zh-CN':{
            'hi':"你好",
            'how':"你好吗？"
        }
    };

    let strings = new LocalizedStrings(sampleLangPackage);

    expect("Hello" || "你好").toBe( strings.hi );

});

