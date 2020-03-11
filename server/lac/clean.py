import pandas as pd
import io

headercols = {
  'CHILD',
  'SEX',
  'DOB',
  'ETHNIC',
  'UPN',
  'MOTHER',
  'MC_DOB'
}
episodecols = {
  'CHILD',
  'DECOM',
  'RNE',
  'LS',
  'CIN',
  'PLACE',
  'PLACE_PROVIDER',
  'DEC',
  'REC',
  'REASON_PLACE_CHANGE',
  'HOME_POST',
  'PL_POST',
  'URN'
}

def checkForNull(df, col):
  df.loc[df[col].isnull(), '_Errors'] = True
  return df

def checkPostCode(df, col):
  postcoderegex = r'([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))s?[0-9][A-Za-z]{2})'
  slicedf = df[col].str.contains(postcoderegex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] = True
  return df

def runHeaderTests(df):
  df = checkForNull(df, "CHILD")
#   df = checkForNull(df, "UPN")
  return df

def runEpisodeTests(df):
  df = checkForNull(df, "CHILD")
#   df = checkForNull(df, "URN")
  #df = checkPostCode(df, "HOME_POST")
  #df = checkPostCode(df, "PL_POST")
  return df

def detectType(df):
  if 'DOB' in df.columns:
    return "Headers"
  elif 'DECOM' in df.columns:
    return "Episodes"
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

    df['_Errors'] = False

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