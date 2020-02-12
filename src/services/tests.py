def checkForNull(df, col):
  df.loc[df[col].isnull(), '_Errors'] = True
  return df

def checkPostCode(df, col):
  postcoderegex = r'([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})'
  slicedf = df[col].str.contains(postcoderegex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] = True
  return df

def runHeaderTests(df):
  df = checkForNull(df, "CHILD")
  df = checkForNull(df, "UPN")
  return df

def runEpisodeTests(df):
  df = checkForNull(df, "CHILD")
  df = checkForNull(df, "URN")
  #df = checkPostCode(df, "HOME_POST")
  #df = checkPostCode(df, "PL_POST")
  return df
