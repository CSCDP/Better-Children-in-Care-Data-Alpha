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

def detectType(df):
  if set(df.columns) == headercols:
    return "Headers"
  elif set(df.columns) == episodecols:
    return "Episodes"
  else:
    return "Unknown"

def read_file(file, buffer):
    data = io.BytesIO(buffer.tobytes())

    print("Determining File Type...")
    if "xls" in file.name:
        df = pd.read_excel(data)
    else:
        df = pd.read_csv(data)

    print("Detecting Data Type...")
    datatype = detectType(df)

    df['_Errors'] = False

    print("Running Tests...")
    if datatype == "Headers":
      df = runHeaderTests(df)
    elif datatype == "Episodes":
      df = runEpisodeTests(df)

    print("Formatting results...")
    df['CHILD'] = df["CHILD"].apply(
      lambda x: "<a href='#'>{}</a>".format(x)
    )
    print("Outputting results...")
    return df[['CHILD', '_Errors']].to_json(), datatype
