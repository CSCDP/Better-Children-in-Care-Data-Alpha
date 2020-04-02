import pandas as pd
import numpy as np
import io
from datetime import date
# from math import sin, cos, sqrt, atan2, radians

headerCols = {
  'CHILD', 'SEX', 'DOB', 'ETHNIC', 'UPN', 'MOTHER', 'MC_DOB'
}

episodeCols = {
  'CHILD', 'DECOM', 'RNE', 'LS', 'CIN',
  'PLACE', 'PLACE_PROVIDER', 'DEC', 'REC', 'REASON_PLACE_CHANGE',
  'HOME_POST', 'PL_POST', 'URN'
}

ethnicityCodes = [
    'WBRI', 'WIRI', 'WOTH', 'WIRT', 'WROM',
    'MWBC', 'MWBA', 'MWAS', 'MOTH', 'AIND',
    'APKN', 'ABAN', 'AOTH', 'BCRB', 'BAFR',
    'BOTH', 'CHNE', 'OOTH', 'REFU', 'NOBT'
]

placeCodes = ["T0", "T1", "T3", "T4", "Z1"]

placeProviderCodes = [
    'PR0', 'PR1', 'PR2', 'PR3', 'PR4', 'PR5'
]

genderCodes = [1,2]

rneCodes = ["S", "P", "L", "T", "U", "B"]

lsCodes = [
    "C1", "C2", "D1", "E1", "V2",
    "V3", "V4", "J1", "J2", "J3",
    "L1", "L2", "L3"
]

cinCodes = [
    "N1", "N2", "N3", "N4",
    "N5", "N6", "N7", "N8"
]

recCodes = [
    "E11", "E12", "E2", "E3", "E4A",
    "E4B", "E13", "E41", "E45", "E46",
    "E47", "E48", "E5", "E6", "E7", "E8",
    "E9", "E14", "E15", "E16", "X1"
]

urnPLCodes = [
    "H5", "P1", "P2", "P3", "R1",
    "R2", "R5", "T0", "T1", "T2",
    "T3", "T4", "Z1"
]

def formatRecords(g, keys):
    result = []
    for item in g.values.tolist():
        item = dict(zip(keys, item))
        result.append(item)
    return result

def checkForNull(df, col):
  df.loc[df[col].isnull(), '_Errors'] += 1
  df.loc[df[col].isnull(), '{}_Errors'.format(col)] = True
  return df

def checkUpn(df, col):
  upncoderegex = r'(^[^IOS]{1}[0-9]{12}$)|(^UN[1-5]{1}$)'
  slicedf = df[col].str.contains(upncoderegex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] += 1
  df.loc[slicedf == False, '{}_Errors'.format(col)] = True
  return df

def checkUrn(df, pl_col, dec_col, urn_col):
  df.loc[~(df[pl_col].isin(urnPLCodes)) & ((df[dec_col] > pd.Timestamp(date(2016, 3, 31))) | (df[dec_col].isnull())) & (df[urn_col].isna()), "{}_Errors".format(urn_col)] = True
  df.loc[df["{}_Errors".format(urn_col)] == True, "_Errors"] = True
  return df

def checkPlaceProvider(df, placeColumn, providerColumn):
  df.loc[(df[placeColumn].isin(placeCodes)) & (df[providerColumn].notnull()), 'PROVIDER_Errors'] = True
  df.loc[(~df[placeColumn].isin(placeCodes)) & (~df[providerColumn].isin(placeProviderCodes)), 'PROVIDER_Errors'] = True
  df.loc[df["PROVIDER_Errors"] == True, "_Errors"] = True
  return df

def checkPostCode(df, col):
  postcoderegex = r'([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))s?[0-9][A-Za-z]{2})'
  slicedf = df[col].str.contains(postcoderegex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] += 1
  df.loc[slicedf == False, '{}_Errors'.format(col)] = True
  return df

def checkCodes(df, allowedlist, col, errorCode):
  df.loc[~df[col].isin(allowedlist), '_Errors'] += 1
  df.loc[~df[col].isin(allowedlist), '{}_Errors'.format(col)] = True
  return df

def checkDate(df, col, errorCode):
  # Will have to change this so that it checks a datetime object instead?
  dateregex = r'^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
  slicedf = df[col].str.contains(dateregex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] += 1
  df.loc[slicedf == False, '{}_Errors'.format(col)] = True
  return df

def calculatePostCodeDistance(df, pc1, pc2, colname):
  df[colname] = df.apply(lambda row: postCodeDistance(row, pc1, pc2), axis=1)
  return df

def runHeaderTests(df):
  #for col in headerCols:
  #  df = checkForNull(df, col)
  #df = checkUpn(df, "UPN")
  #df = checkDate(df, "DOB", 102)
  #df = checkCodes(df, ethnicityCodes, "ETHNIC", 103)
  #df = checkCodes(df, genderCodes, "SEX", 101)
  return df

def runEpisodeTests(df):
  print("Setting fields to datetime")
  #df['DEC'] = df['DEC'].apply(lambda x: x.strftime('%Y-%m-%d')if not pd.isnull(x) else '')
  df['DEC'] = pd.to_datetime(df['DEC'], errors='coerce')
  df.loc[df.DEC.isnull(), "DEC"] = pd.Timestamp(date(2090, 3, 31))
  #for col in episodeCols:
  #  df = checkForNull(df, col)
  print("Check URN")
  df = checkUrn(df, "PLACE", "DEC", "URN")
  #df = checkPostCode(df, "HOME_POST")
  #df = checkPostCode(df, "PL_POST")
  #df = calculatePostCodeDistance(df, "HOME_POST", "PL_POST", "PL_DISTANCE")
  print("Check other fields")
  df = checkPlaceProvider(df, "PLACE", "PLACE_PROVIDER")
  #df = checkDate(df, "DECOM", 141)
  #df = checkDate(df, "DEC", 141)
  #df = checkCodes(df, rneCodes, "RNE", 143)
  #df = checkCodes(df, lsCodes, "LS", 144)
  #df = checkCodes(df, cinCodes, "CIN", 145)
  #df = checkCodes(df, recCodes, "REC", 141)

  return df

def detectType(df):
  if 'ETHNIC' in df.columns:
    return "Headers"
  elif 'DECOM' in df.columns:
    return "Episodes"
  elif 'DUC' in df.columns:
    return "UASC"
  else:
    return "Unknown"


def read_file_from_buffer(buffer):
    return read_file(buffer.tobytes())


def read_file(data):
    data = io.BytesIO(data)
    df = pd.read_csv(data)

    print("Detecting Data Type...")
    datatype = detectType(df)

    df['_Errors'] = 0

    print("Running Tests...")
    if datatype == "Headers":
      df['CHILD'] = pd.to_numeric(df['CHILD'])
      df.set_index('CHILD')
      df = runHeaderTests(df)
    elif datatype == "Episodes":
      df.set_index('CHILD')
      df = runEpisodeTests(df)
    elif datatype == "UASC":
      df.set_index('CHILD')


    '''print("Formatting results...")
    df['CHILD'] = df["CHILD"].apply(
      lambda x: "<a href='#'>{}</a>".format(x)
    )'''
    print("Outputting results...")
    df = df.replace(np.nan, '', regex=True)
    if datatype == "Headers":
        #return dict(type=datatype,data=df.to_dict(orient='records'))

        # Group by the Child ID, and use it to force a unique key in the resulting dictionary
        # Should probably edit later to get column labels from DF itself like the other data types
        return dict(type=datatype,data=df.set_index('CHILD')[["SEX", "DOB", "ETHNIC", "UPN", "MOTHER", "MC_DOB"]].T.to_dict('dict'))
    elif datatype == "Episodes":
        # For some reason this doesn't format the date correctly....  :-(
        df["DEC"].dt.strftime('%d/%m/%Y')
        df.loc[df["DEC"] == "31-3-2090", "DEC"] = ''
        #return dict(type=datatype,data=df.to_dict(orient='records'))
        return dict(type=datatype,data=df.groupby('CHILD').apply(lambda g: formatRecords(g, df.columns.tolist())).to_dict())
    else:
        #return dict(type=datatype,data=df.to_dict(orient='records'))
        return dict(type=datatype,data=df.groupby('CHILD').apply(lambda g: formatRecords(g, df.columns.tolist())).to_dict())

