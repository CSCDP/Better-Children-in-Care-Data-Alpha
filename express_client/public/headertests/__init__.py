HEADER_COLUMN_LIST = [
    "CHILD",
    "SEX",
    "DOB",
    "ETHNIC",
    "UPN",
    "MOTHER",
    "MC_DOB"
]

def runInitialChecks(df):
    checkHeaderColumnCount(df)
    checkHeaderColumnNames(df)

def checkHeaderColumnCount(df):
    if len(df.columns) != len(COLUMN_LIST):
        print("Column count is different!")
        return False

def checkHeaderColumnNames(df):
    for idx,col in df.columns:
        if df.columns[idx] != COLUMN_LIST[idx]:
            print("Column {} isn't in the correct position.  Should be {}".format(df.columns[idx], COLUMN_LIST[idx]))
            return False

