import pandas as pd
import io
import datetime
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

placeProviderCodes = [
    'PR0', 'PR1', 'PR2', 'PR3', 'PR4', 'PR5'
]

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

def checkPostCode(df, col):
  postcoderegex = r'([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))s?[0-9][A-Za-z]{2})'
  slicedf = df[col].str.contains(postcoderegex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] += 1
  df.loc[slicedf == False, '{}_Errors'.format(col)] = True
  return df

def checkCodes(df, allowedlist, col):
  df.loc[~df[col].isin(allowedlist), '_Errors'] += 1
  df.loc[~df[col].isin(allowedlist), '{}_Errors'.format(col)] = True
  return df

def checkDate(df, col):
  dateregex = r'^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
  slicedf = df[col].str.contains(dateregex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] += 1
  df.loc[slicedf == False, '{}_Errors'.format(col)] = True
  return df

def calculatePostCodeDistance(df, pc1, pc2):
  # Need to implement preferably by doing a local lookup and not an API call
  # If I can look up post code and convert to longitude and latitude, here is the
  # calculation that would work:
  lat1 = radians(52.2296756)
  lon1 = radians(21.0122287)
  lat2 = radians(52.406374)
  lon2 = radians(16.9251681)

  dlon = lon2 - lon1
  dlat = lat2 - lat1

  a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
  c = 2 * atan2(sqrt(a), sqrt(1 - a))

  distance = R * c
  return df

def runHeaderTests(df):
  for col in headerCols:
    df = checkForNull(df, col)
  df = checkUpn(df, "UPN")
  df = checkDate(df, "DOB")
  df = checkCodes(df, ethnicityCodes, "ETHNIC")
  return df

def runEpisodeTests(df):
  for col in episodeCols:
    df = checkForNull(df, col)

  df = checkPostCode(df, "HOME_POST")
  df = checkPostCode(df, "PL_POST")
  df = checkDate(df, "DECOM")
  df = checkDate(df, "DEC")
  df = checkCodes(df, rneCodes, "RNE")
  df = checkCodes(df, lsCodes, "LS")
  df = checkCodes(df, cinCodes, "CIN")
  df = checkCodes(df, recCodes, "REC")

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


#     print("Determining File Type...")
#     if "xls" in file.name:
#         df = pd.read_excel(data)
#     else:
    df = pd.read_csv(data)

    print("Detecting Data Type...")
    datatype = detectType(df)

    df['_Errors'] = 0

    print("Running Tests...")
    if datatype == "Headers":
      df = runHeaderTests(df)
    elif datatype == "Episodes":
      df = runEpisodeTests(df)

    '''print("Formatting results...")
    df['CHILD'] = df["CHILD"].apply(
      lambda x: "<a href='#'>{}</a>".format(x)
    )'''
    print("Outputting results...")
    return dict(type=datatype,data=df.to_dict(orient='records'))
